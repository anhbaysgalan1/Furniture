const BaseController = use("./BaseController")
const HourModel = use("App/Models/Hour")
const UserModel = use("App/Models/User")
const SetTimeModel = use("App/Models/Setting")
const DayOffModel = use("App/Models/DayOff")
const RequestModel = use("App/Models/Request")
const ConstructionModel = use("App/Models/Construction")
const { ObjectId } = use("mongodb")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const Common = use("App/Common/common")
const _ = use("lodash")
const common = use("App/Common/common")
const MILLISECONDS_IN_8_HOURS = 28800000

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/

class HourController extends BaseController {
    constructor() {
        super()
        this.Model = new HourModel();
        this.UserModel = new UserModel();
        this.SetTimeModel = new SetTimeModel();
        this.RequestModel = new RequestModel()
        this.ConstructionModel = new ConstructionModel()
        this.DayOffModel = new DayOffModel()
    }

    async index({ request, response }) {

        //API này gọi ở 3 màn để tránh việc lặp code, màn quản lý giờ làm, chấm công nhân viên và tình hình chấm công của chính mình

        const input = request.query
        //lấy query date từ input
        let { startDate, endDate } = input
        startDate = Common.string_to_ISO(startDate)
        endDate = Common.string_to_ISO(endDate)

        //check xem là query tất cả công nhân hay 1 công nhân (unique= true 1 người)
        //time_keeping là biến để check xem màn chấm công nhân viên (time_keeping = true) hay màn quản lý giờ làm

        const { unique = false, time_keeping = false, _id = Auth.user._id, filters } = input
        //check có phải là quản lý hay không
        const { mana_timekeeping } = request.permissions

        //tạo conditions cho người dùng
        let userCondition = {}

        //lấy filter từ query 
        if (Array.isArray(filters)) {
            filters.map(filter => {
                let _filter = JSON.parse(filter)
                if (_filter.columnName.includes('code')) {
                    userCondition.code = {
                        $regex: String(_filter.value).trim(),
                        $options: 'i'
                    }
                }

                if (_filter.columnName.includes('name')) {
                    userCondition.name = {
                        $regex: String(_filter.value).trim(),
                        $options: 'i'
                    }
                }
            })
        }

        if (unique) {
            //nếu có quyền quản lý chấm công và check cho màn chấm công nhân viên
            if (mana_timekeeping && time_keeping) {
                userCondition = {
                    _id: ObjectId(_id) //_id từ client truyền lên
                }
            } else {
                //check cho màn tình hình chấm công của chính mình
                userCondition = {
                    _id: ObjectId(Auth.user._id)
                }
            }

        } else {
            //nếu lấy ra tất cả user trong màn quản lý giờ làm thì check quyền quản lý chấm công
            if (!mana_timekeeping) {
                throw new ApiException(403, "Không có quyền quản lý chấm công!")
            }
        }

        //tạo conditions cho thời gian
        let dateCondition =
        {
            isoDate: {
                $gte: startDate,
                $lte: endDate
            }
        }

        let users = await this.UserModel.findByCondition(userCondition, { name: 1, code: 1 })
        //tìm kiếm lịch sử
        let history_promises = users.map(user => {
            return this.Model.findByCondition({
                userId: ObjectId(user._id),
                ...dateCondition,
                checkInStatus: true,
                checkOutStatus: true,


            }, {
                    startTime: 1,
                    endTime: 1,
                    _startTime: 1,
                    _endTime: 1,
                    setting: 1,
                    date: 1,
                    constructions: 1,
                    typeOfDayInWeek: 1,
                    isNormalDay: 1,
                    fuel: 1,
                    personal_distance: 1,
                    work_distance: 1
                })
        })

        //tìm kiếm xin phép đi muộn(1), OverTime(2), nghỉ thay thế(6)
        let requestPromises = users.map(user => {
            let conditions = {
                userId: ObjectId(user._id),
                ...dateCondition,
                type: { $in: [1, 2, 6] },
                status: true
            }
            return this.RequestModel.getAcceptedRequests(conditions)
        })

        //tìm kiếm ngày nghỉ có lương(3) và ngày nghỉ bù(5)
        let dayOffPromises = users.map(user => {
            return this.DayOffModel.getRosteredAndPaidDayOff(user._id, { startDate, endDate })
        })

        let holidaysPromise = this.SetTimeModel.getAndGroupHoliday({ startDate, endDate })

        let [histories, requests, holidayObj, dayOff] = await Promise.all([
            Promise.all(history_promises),
            Promise.all(requestPromises),
            holidaysPromise,
            Promise.all(dayOffPromises)
        ])

        //tính tổng ngày đi làm của users
        let totalDays = []
        histories.map(item => {
            totalDays.push(item.length)
        })

        //tính giờ làm tất cả lịch sử
        let hours_promise = users.map((user, index) => {
            //xóa những ngày đi làm vào ngày nghỉ có lương tránh cộng 2 ngày
            histories[index] = histories[index].filter((history) => {
                if (!dayOff[index].paidHoliday.includes(history.date)) {
                    return history;
                }
            })

            return Promise.all(
                histories[index].map((history) => {
                    return this.Model.getHourPerDay(history, requests[index], holidayObj);
                })
            )
        })

        let hours = await Promise.all(hours_promise)

        //tạo bản ghi ngày nghỉ có lương chèn phía sau mảng hour
        dayOff.map(({ paidHoliday }, index) => {
            paidHoliday.map(day => {
                hours[index].push(
                    {
                        _id: day,
                        date: day,
                        normalDays: {
                            standardHour: MILLISECONDS_IN_8_HOURS
                        },
                        constructions: [{
                            name: "--",
                            code: "--"
                        }],
                        isPaidHoliday: true,
                        totalTime: MILLISECONDS_IN_8_HOURS
                    })
            })
        })

        //lấy trong setting time xem là kiểu giờ 60 hay 10
        const { is60Time } = await this.SetTimeModel.getTimeSetting() || {}

        //lấy tên các trường muốn chuyển đổi giờ 60 hay 10 ra để đệ quy chuyển giờ
        let hourFields = ['standardHour', 'morningOT', 'nomalOT', 'nightOT', 'lateWork', 'totalTime']

        //trả về kết quả nếu tìm kiếm ở màn chấm công nhân viên
        if (time_keeping) {
            //lấy constructions trong bảng construction, history[0] chính là giờ làm của người được query
            let promises = histories[0].map((item, index) => {
                let { constructions } = histories[0][index]
                return Promise.all(
                    constructions.map(construction => {
                        return this.ConstructionModel.getById(construction.constructionId, { name: 1, code: 1 })
                    })
                )
            })

            let constructions = await Promise.all(promises)

            let totalTime = 0
            histories[0].map((item, index) => {
                //lấy nhiên liệu, quãng đường đi, công trường... của những bản ghi trong history, không lấy bản ghi ngày nghỉ có lương
                let { fuel, personal_distance, work_distance, _id } = histories[0][index]
                
                //thêm các thông tin khác vào bản ghi
                hours[0][index] = {
                    ...hours[0][index],
                    fuel,
                    personal_distance,
                    work_distance,
                    _id,
                    constructions: constructions[index]
                }
            })

            //tính tổng giờ trong tháng
            hours[0].map(item => totalTime += item.totalTime)

            let { sorting = [] } = input
            let [field_sort] = sorting

            if (field_sort) {
                hours[0] = await this.Model.sortResult(hours[0], JSON.parse(sorting))
            }

            else {
                hours[0] = await this.Model.sortResult(hours[0], { columnName: "date", direction: "desc" })
            }

            let _hours = await this.Model.convertFieldTime(hours[0], hourFields, is60Time)
            //chuyển ms thành giờ phút
            totalTime = is60Time? common._60TimeFormat(totalTime) : common._10TimeFormat(totalTime);
            _hours.push({
                totalRow: true, //biến để nhận biết đây là hàng tổng
                totalTime: totalTime
            })
            return { data: _hours, is60Time: is60Time}
        }

        //trả về kết quả màn quản lý giờ làm và tình hình chấm công
        let hour_promises = users.map((user, index) => {
            return this.Model.getTotalHourOfUser(hours[index])
        })

        let hourOfUsers = await Promise.all(hour_promises)
        let _result = hourOfUsers.map((hour, index) => {
            return {
                ...hour,
                User: users[index],
                _id: users[index]._id,
                totalDays: totalDays[index],
                rosteredDayOff: dayOff[index].rosteredDayOff,
            }
        })

        //trả về màn tình hình chấm công hoặc quản lý giờ làm
        if (unique) {
            let _hours = await this.Model.convertFieldTime(_result, hourFields, is60Time)
            return {
                unique: true,
                data: _hours,
                is60Time: is60Time
            }
        } else {
            let { sorting } = input
            if (sorting) {
                _result = await this.Model.sortResult(_result, sorting)
            }
            let _hours = await this.Model.convertFieldTime(_result, hourFields, is60Time)
            return { data: _hours, is60Time: is60Time }
        }

    }
}

module.exports = HourController