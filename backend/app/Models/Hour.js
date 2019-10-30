const BaseModel = use("./BaseModel")
const moment = use("moment")
const DatabaseException = use("App/Exceptions/DatabaseException")
const common = use("App/Common/common")
const _ = use('lodash')
const MILLISECONDS_IN_1_HOURS = 3600000
const MILLISECONDS_IN_8_HOURS = 28800000
class Hour extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "histories"
    }
    static get relationship() {
        return {
        }
    }
    async getHourPerDay(history, requests, holidayObj, _isRound) {
        let { date, setting, _startTime, _endTime
        } = history
        let { lateReq, overTimeReq, replaceDateReq } = requests
        let inOutTime = {}

        inOutTime = {
            startTime: _startTime,
            endTime: _endTime
        }

        // tìm loại ngày
        let typeOfDay = holidayObj[date] || history.typeOfDayInWeek
        //nếu là ngày nghỉ thay thế thì đó là ngày thường
        if (replaceDateReq[date]) {
            typeOfDay = 'normalDays'
        }
        let lateWork = 0, hour = {}
        //tính giờ làm trong ngày
        if (history.isNormalDay) {
            hour = await this.getHourCurrentNomalDay(inOutTime, setting, overTimeReq[date])
            if (hour.standardHour < MILLISECONDS_IN_8_HOURS) {
                if (lateReq[date]) {
                    hour.standardHour += lateReq[date]
                    hour.standardHour = Math.min(hour.standardHour, MILLISECONDS_IN_8_HOURS)
                }
                lateWork = Math.max(0, MILLISECONDS_IN_8_HOURS - hour.standardHour)
            }
        }
        else {
            hour = await this.getHourCurrentNightDay(inOutTime, setting)
        }
        let totalTime = 0
        Object.keys(hour).map(property => {
            totalTime += hour[property]
        })
        return {
            date: date,
            [typeOfDay]: hour,
            totalTime: totalTime,
            lateWork: lateWork,
        }
    }

    //tính thời gian theo lịch thường
    async getHourCurrentNomalDay(inOutTime = {}, setting = {}, overTimeReq = []) {
        let hour = {};
        hour.standardHour = await this.getStandardHourNomalDay(inOutTime, setting)
        //get overtime
        //lịch overtime sáng sớm
        let morningOverTimeRange = {
            startTime: setting.overTimeBeforeStart,
            endTime: setting.overTimeBeforeEnd
        }
        //lịch overtime bình thường
        let normalOverTimeRange = {
            startTime: setting.overTimeStart,
            endTime: setting.overTimeEnd
        }
        //lịch overtime đêm muộn
        let nightOverTimeRange = {
            startTime: setting.overTimeNightStart,
            endTime: setting.overTimeNightEnd
        }

        //tính thời gian OT
        let OT_hour = await this.getOTHourNormalDay({
            morningOverTimeRange,
            nightOverTimeRange,
            normalOverTimeRange,
            inOutTime,
            overTimeReq
        })

        // hợp nhất giờ làm OT và giờ bình thường
        hour = Object.assign(hour, OT_hour)
        return hour
    }

    //lấy giờ làm tiêu chuẩn trong ngày thường
    async getStandardHourNomalDay(inOutTime, setting) {
        //thời gian làm việc trước nghỉ trưa
        let _workBeforeNoonBreak = {
            startTime: setting.workingtimeStart,
            endTime: setting.noonBreakStart
        }
        let workBeforeNoonBreak = await this.getIntersectionTime(
            [inOutTime, _workBeforeNoonBreak]
        )
        //thời gian làm việc sau nghỉ trưa
        let _workAfterNoonBreak = {
            startTime: setting.noonBreakEnd,
            endTime: setting.workingTimeEnd
        }

        let workAfterNoonBreak = await this.getIntersectionTime(
            [inOutTime, _workAfterNoonBreak]
        )

        let standard_hour = workBeforeNoonBreak + workAfterNoonBreak
        return standard_hour

    }

    //lấy giờ làm OT trong ngày thường
    async getOTHourNormalDay(time) {
        let {
            morningOverTimeRange = {},
            overTimeReq = [],
            nightOverTimeRange = {},
            normalOverTimeRange = {},
            inOutTime = {}
        } = time
        let config = {
            morningOT: 0,
            nomalOT: 0,
            nightOT: 0
        };

        //nếu không có xin phép OT thì không tính
        if (overTimeReq.length === 0) return config
        //tính thời gian giao nhau giữa check in check out và kế hoạch làm việc
        for (let overtime of overTimeReq) {
            config.morningOT += await this.getIntersectionTime(
                [morningOverTimeRange, inOutTime, overtime]
            )
            config.nomalOT += await this.getIntersectionTime(
                [normalOverTimeRange, inOutTime, overtime]
            )
            config.nightOT += await this.getIntersectionTime(
                [nightOverTimeRange, inOutTime, overtime]
            )
        }
        return config
    }

    //tính thời gian đi muộn về sớm
    async getLatework(setting, { startTime, endTime }) {
        let lateWork = 0
        const { noonBreakEnd, noonBreakStart, workingtimeStart, workingTimeEnd } = setting

        //check đi muộn
        if (moment(startTime) > moment(workingtimeStart)) {
            lateWork += (moment(startTime) - moment(workingtimeStart))
        }
        //check ve som
        if (moment(endTime) < moment(workingTimeEnd)) {
            lateWork += (moment(workingTimeEnd) - moment(endTime))
        }
        let realTimeBreakLunch = await this.getIntersectionTime([
            {
                startTime: noonBreakStart,
                endTime: noonBreakEnd
            },
            {
                startTime: startTime,
                endTime: endTime
            }
        ])

        let scheduleTimeLunch = moment(noonBreakEnd) - moment(noonBreakStart)
        lateWork = lateWork - scheduleTimeLunch + realTimeBreakLunch
        return lateWork
    }
    //tính thời gian ca đêm
    async getHourNightDay(time) {
        let {
            standardWorkTimeRange,
            nightOverTimeRange,
            normalOverTimeRange,
            inOutTime
        } = time

        let config = {
            standardHour: 0,
            nomalOT: 0,
            nightOT: 0
        };
        config.standardHour = await this.getIntersectionTime(
            [standardWorkTimeRange, inOutTime]
        )
        config.nomalOT = await this.getIntersectionTime(
            [normalOverTimeRange, inOutTime]
        )
        config.nightOT = await this.getIntersectionTime(
            [nightOverTimeRange, inOutTime]
        )
        return config
    }

    //calculate setting of night work
    async getHourCurrentNightDay(inOutTime, setting) {
        //xét xem thời gian đi làm so với lúc 22h là lớn hơn 8 hay nhỏ hơn
        let workingBeforeTrigger = moment(setting.overTimeNightStart) - moment(inOutTime.startTime)
        //thời gian đi làm tiêu chuẩn
        let standardWorkTimeRange = {}
        //lịch overtime bình thường
        let normalOverTimeRange = {}
        //lịch overtime đêm muộn
        let nightOverTimeRange = {}
        //nếu bé hơn 8h thì kg có OT bình thường
        if (workingBeforeTrigger < MILLISECONDS_IN_8_HOURS) {
            standardWorkTimeRange = {
                startTime: inOutTime.startTime,
                endTime: setting.overTimeNightStart
            }
        } else {
            standardWorkTimeRange = {
                startTime: inOutTime.startTime,
                endTime: setting.overTimeStart
            }
            normalOverTimeRange = {
                startTime: setting.overTimeStart,
                endTime: setting.overTimeNightStart
            }
        }
        //lịch overtime đêm muộn
        nightOverTimeRange = {
            startTime: setting.overTimeNightStart,
            endTime: inOutTime.endTime
        }

        //tính thời gian OT
        let hour = await this.getHourNightDay({
            standardWorkTimeRange,
            nightOverTimeRange,
            normalOverTimeRange,
            inOutTime
        })
        return hour
    }

    //đưa một mảng array các thời gian vào và trả về tổng số thời gian giao nhau của mảng thời gian đó
    /**
     * 
     * @param {*} intervals là mảng theo cú pháp [{startTime, endTime},{startTime, endTime}]
     * @returns khoảng thời gian giao nhau giữa các khung thời gian trong mảng
     */
    async getIntersectionTime(intervals) {
        let left = intervals[0].startTime
        let right = intervals[0].endTime
        for (let interval of intervals) {
            if (moment(interval.startTime) > moment(right)
                || moment(interval.endTime) < moment(left)) {
                return 0
            } else {
                left = moment.max(moment(interval.startTime), moment(left))
                right = moment.min(moment(interval.endTime), moment(right))
            }
        }

        return right - left
    }
    //get total time of user
    async getTotalHourOfUser(hours) {
        let hourPerPerson = {}
        for (let item of hours) {
            hourPerPerson = await this.plusToTotalTime(hourPerPerson, item)
        }
        return hourPerPerson
    }

    //đệ quy để tính thời gian toàn mảng
    async plusToTotalTime(hour, time) {
        for (var property in time) {
            if (hour.hasOwnProperty(property)) {
                if (typeof time[property] == "object") {
                    this.plusToTotalTime(hour[property], time[property]);
                } else {
                    if (Number.isInteger(time[property])) {
                        hour[property] += Number(time[property])
                    }
                }
            } else {
                hour[property] = time[property]
            }
        }
        return hour
    }
    //đệ quy để chuyển đổi thời gian
    async convertFieldTime(time, hourFields, is60Time) {

        if (Array.isArray(time)) {
            for (let index in time) {
                this.convertFieldTime(time[index], hourFields, is60Time)
            }
        } else {
            if (typeof time === 'object') {
                for (var property in time) {
                    if (typeof time[property] === "object") {
                        this.convertFieldTime(time[property], hourFields, is60Time);
                    } else {
                        if (Number.isInteger(time[property]) && hourFields.includes(property)) {
                            if (is60Time) {
                                time[property] = common._60TimeFormat(time[property])
                            } else {
                                time[property] = common._10TimeFormat(time[property])
                            }
                        }
                        if (property === 'date') {
                            time[property] = moment(time[property]).format('YYYY/MM/DD')
                        }
                    }

                }

            }


        }

        return time
    }

    async sortResult(_result, field_sort) {
        if (field_sort) {
            let { columnName, direction } = field_sort
            _result = _.orderBy(_result, (item) => _.get(item, columnName, ''), [direction]);
        }
        return _result
    }

}


module.exports = Hour
