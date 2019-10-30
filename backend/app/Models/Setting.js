const BaseModel = use("./BaseModel")
const moment = use("moment")
const DatabaseException = use("App/Exceptions/DatabaseException")
const Common = use("App/Common/common")
const { ObjectId } = require('mongodb')
class Setting extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "settings"
    }
    static get relationship() {
        return {
        }
    }
    async getTimeSetting(data = {}) {
        let { type } = data
        let condition = {
            key: "time",
        }
        if (type) condition.type = type
        return await this.getOne(condition)
    }

    async getNightSetting() {
        return await this.getOne({ key: "night" })
    }
    async getAndGroupHoliday({ startDate, endDate }) {
        let result = await this.getOne({ key: "holiday" })
        let holidays = []
        if (result) holidays = result.data
        let holidayObj = {}

        holidays.map(day => {
            let date = Common.string_to_ISO(day.date)
            let isValid = moment(date).isBetween(startDate, endDate, null, '[]');
            if (isValid) {
                if (day.type == 0) {
                    holidayObj[day.date] = "statutoryDays"
                }
                if (day.type == 1) {
                    holidayObj[day.date] = "nonStatutoryDays"
                }

            }
        })
        return holidayObj
    }

    async getHolidaySetting() {
        let result = await this.getOne({ key: "holiday" })
        if (result) return result.data
        return []
    }
    /**
     * 
     * @param {*} settingTime : lịch setting
     * @param {*} day : ngày
     * @returns normalDays: đi làm ngày bình thường, 
     * statutoryDays: đi làm ngày nghỉ theo luật định,
     * nonStatutoryDays: đi làm ngày nghỉ ngoài luật định
     */

    async getTypeOfDayInWeek(settingTime, day) {
        let dayInWeek = moment(day).day();
        let { workingDay, holidayInProvision, holidayOutProvision } = settingTime
        //check if it is working day
        if (workingDay.includes(dayInWeek)) {
            return "normalDays"
        }
        if (holidayInProvision.includes(dayInWeek)) {
            return "statutoryDays"
        }
        if (holidayOutProvision.includes(dayInWeek)) {
            return "nonStatutoryDays"
        }
    }

    async getTodayTimeSetting(checkInTime, timeId) {
        let result = await this.getOne({ _id: ObjectId(timeId) }, { insert: 0, update: 0 })
        result = await this.convertToCheckInDay(result, checkInTime)
        return result
    }
    async getTodaySlideTimeSetting(checkInTime) {
        let result = await this.getOne({ key: "slideTime" }, { insert: 0, update: 0 })
        result = await this.convertToCheckInDay(result, checkInTime)
        return result
    }

    async convertToCheckInDay(setting, checkInTime) {
        let offset = moment(checkInTime).diff(setting['startOfDay'], 'days')
        let propsName = []
        if (setting.key === "time") {
            propsName = [
                'startOfDay',
                'overTimeBeforeStart',
                'overTimeBeforeEnd',
                'workingtimeStart',
                'workingTimeEnd',
                'overTimeStart',
                'overTimeEnd',
                'overTimeNightStart',
                'overTimeNightEnd',
                "noonBreakEnd",
                "noonBreakStart"]
        }
        if (setting.key === "slideTime") {
            propsName = [
                'startOfDay',
                'overTimeNightStart',
                'overTimeNightEnd',
            ]
        }
        propsName.map(prop => {
            setting[prop] = moment(setting[prop]).add(offset, 'day').toISOString()
        })
        return setting
    }

    async updateTimeSetting(data = []) {
        return await Promise.all(data.map(item => this.updateByCondition({ type: item.type }, item)))
    }

    async updateHolidaySetting(data) {
        let holiday = await this.getOne({ key: "holiday" })
        if (!holiday) {
            return await this.insertOne({
                key: "holiday",
                ...data
            })
        } else {
            return await this.update(holiday._id, data)
        }
    }
    async find() {
        let [error, result] = await to(this.collection.find({}).toArray());
        if (error) throw new DatabaseException(error)
        return result
    }

    //kiem tra set ngay lam viec co phai ngay le khong
    async checkHoliday(day) {
        let [error, result] = await to(this.collection.find({
            data: {
                $elemMatch: {
                    date: day
                }
            }
        }).count())
        if (error) throw new DatabaseException(error);
        return result;
    }
    async checkTime(day) {
        day = moment(day).day()
        let [error, result] = await to(this.collection.find({
            $or: [{
                holidayInProvision: day
            }, {
                holidayOutProvision: day
            }]
        }).count())
        if (error) throw new DatabaseException(error);
        return result;
    }
}

module.exports = Setting
