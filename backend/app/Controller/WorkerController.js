const BaseController = use("./BaseController")
const WorkerModel = use("App/Models/Worker")
const ConstructionModel = use("App/Models/Construction")
const SetTimeModel = use("App/Models/Setting")
const HistoryModel = use("App/Models/History")
const PositionModel = use("App/Models/Position")
const UserModel = use("App/Models/User")
const _ = use('lodash')
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require('mongodb')
const Common = use("App/Common/common")
var moment = require('moment');

class WorkerController extends BaseController {
    constructor() {
        super()
        this.Model = new WorkerModel();
        this.ConstructionModel = new ConstructionModel();
        this.SetTimeModel = new SetTimeModel()
        this.HistoryModel = new HistoryModel()
        this.PositionModel = new PositionModel()
        this.UserModel = new UserModel()
        this.config = {
            nomalRoot: "overTimeBeforeStart",
            nightRoot: "startOfDay"
        }
    }

    async initCheckTime({ request, response }) {
        let input = request.query
        let allowFields = {
            date: 'string!'
        }

        input.date = Common.checkFormatDate(input.date)
        let data = this.validate(input, allowFields, { removeNotAllow: true })

        let result = {
            date: data.date,
            constructionDropdown: await this.ConstructionModel.getValidList({ name: 1, code: 1, address: 1 }, data.date)
        }

        //lấy lịch của ngày hiện tại
        let schedules = await this.ConstructionModel.getByUserId(Auth.user._id, data.date)
        // let schedule_constructions = schedules.map(item => item._id)

        //lấy bản ghi check in nhưng chưa check out
        let lastOnlyCheckIn = await this.Model.getLastOnlyCheckIn(Auth.user._id)
        if (lastOnlyCheckIn) return {
            ...result,
            ...lastOnlyCheckIn,
            constructions: await this.getInitConstructions(lastOnlyCheckIn.constructions, schedules)
        }

        //lấy bản ghi đã check out
        let checkoutRecord = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            checkOutStatus: true,
            date: data.date
        })

        if (checkoutRecord) return {
            ...result,
            ...checkoutRecord,
            constructions: await this.getInitConstructions(checkoutRecord.constructions, schedules)
        }

        return { ...result, constructions: schedules, slideTime: this.getSlideTime(schedules) }
    }

    async getInitConstructions(constructions = [], schedule_constructions = []) {
        let _constructions = await Promise.all(constructions.map(item => this.ConstructionModel.getById(item.constructionId, { address: 1, name: 1, code: 1 })));
        _constructions = _constructions.map((item, index) => {
            return ({
                ...item,
                workTime: constructions[index].workTime,
                constructionId: String(item._id),
            })
        })
        schedule_constructions = schedule_constructions.map((item, index) => {
            return ({
                ...item,
                workTime: schedule_constructions[index].workTime,
                constructionId: String(item._id),
                canNotDelete: true
            })
        })

        let result = _.unionBy(schedule_constructions, _constructions, "constructionId");
        return result
    }
    //lấy slide time gửi lên frontend để lọc dropdown
    async getSlideTime(constructions = [], date) {
        let slideTime = null
        if (constructions.length) {
            slideTime = false
            let id = constructions[0].constructionId || constructions[0]._id;
            let { schedules = [] } = await this.ConstructionModel.getById(id, { schedules: 1 }) || {};
            schedules.find(schedule => {
                if (schedule.start === date) {
                    slideTime = schedule.slideTime;
                }
            })
        }
        return slideTime
    }

    async checkIn({ request, response }) {
        let input = request.body
        input.isoDate = Common.string_to_ISO(input.date)
        input.startTime = Common.getOnlyHoursMinutes(new Date())
        input.date = Common.checkFormatDate(input.date)
        let allowFields = {
            latitudeIn: "number!",
            longitudeIn: "number!",
            startTime: "date!",
            date: "string!",
            isoDate: "date!",
            isBefore5h: "boolean"
        }

        let data = this.validate(input, allowFields, { removeNotAllow: true })

        let exist = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            date: data.date,
            checkInStatus: true
        })

        if (exist) throw new ApiException(400, "Check_In_Once")

        // //check construction exist in DB
        // let promise = data.constructions.map(construction => {
        //     return this.ConstructionModel.getById(construction.constructionId);
        // });
        // let constructions = await Promise.all(promise)

        // data.constructions = data.constructions.filter((construction, index) => {
        //     if (constructions[index]) {
        //         return construction
        //     }
        // })

        // data.isNormalDay = await this.ConstructionModel.isNormalDay(data.constructions)
        // data.isNormalDay = true

        //lấy lịch của setting time ra
        let user = await this.UserModel.getById(Auth.user._id) || {};
        let { timeId = '' } = user;
        if (!timeId) throw new ApiException(400, "Người dùng chưa được gán pattern ca ngày!");
        let settingTime = await this.SetTimeModel.getTodayTimeSetting(data.startTime, timeId);
        // let settingNight = await this.SetTimeModel.getTodayNightSetting(data.startTime);

        let RoundTime = {
            roundStart: settingTime.roundStart,
            roundStartType: settingTime.roundStartType
        }

        //làm tròn thời gian bắt đầu
        
        data._startTime = Common.roundingTime({
            root: settingTime.startOfDay,
            time: data.startTime,
            range: RoundTime.roundStart,
            type: RoundTime.roundStartType
        })

        data._startTime = new Date(data._startTime)

        //check loại ngày đi làm trong tuần
        data.typeOfDayInWeek = await this.SetTimeModel.getTypeOfDayInWeek(settingTime, data.date)

        //add salary to current user
        let userInfo = await this.UserModel.getById(Auth.user._id, { name: 1, code: 1, positionId: 1 });
        if (!userInfo) throw new ApiException(400, "User_Not_Exist")

        //get salary per day and assign to user
        let remuneration
        try {
            let Position = await this.PositionModel.getById(userInfo.positionId, { _id: 0, remuneration: 1 })
            remuneration = Position.remuneration
        } catch (error) {
            throw new ApiException(400, "No_Position")
        }

        //ktra xem co phải di lam ngay nghi khong
        let check = false
        let checkWorkOnHoliday = await this.SetTimeModel.checkHoliday(data.date)
        let checkWorkOnDayOff = await this.SetTimeModel.checkTime(data.date)
        if (checkWorkOnDayOff == 1 || checkWorkOnHoliday == 1) {
            check = true
        }

        data = {
            ...data,
            workOnDayOff: check
        }

        data = {
            ...data,
            userId: ObjectId(Auth.user._id),
            remuneration: remuneration,
            checkInStatus: true,
            checkOutStatus: false
        }

        let schedules = await this.ConstructionModel.getByUserId(Auth.user._id, data.date)
        data.constructions = []
        if (schedules.length) {
            data.slideTime = await this.getSlideTime(schedules, data.date);
            data.constructions = schedules.map(item => {
                return {
                    constructionId: ObjectId(item._id)
                }
            })
        }

        // kiểm tra xem check in có trong khoảng 0h-5h k để xác định khung tgian của slide time
        let today5h, todayStart 
        today5h = new Date().setHours(5,0,0,0)
        todayStart = new Date().setHours(0,0,0,0)
        if(data.slideTime){
            if(moment(data._startTime) > moment(todayStart) && moment(data._startTime) < moment(today5h)){
                data.isBefore5h = true
            }else data.isBefore5h = false
        }

        let result = await this.Model.insertOne(data)
        return result
    }

    // async getSettingTime() {
    //     //add setting time and night to history
    //     let user = await this.UserModel.getById(Auth.user._id) || {};
    //     let { timeId = '' } = user;
    //     if (!timeId) throw new ApiException(400, "Người dùng chưa được gán pattern ca ngày!");
    //     let settingTime = await this.SetTimeModel.getTodayTimeSetting(data.startTime);
    //     let settingSlide = await this.SetTimeModel.getTodaySlideTimeSetting(data.startTime, timeId);

    //     //lấy ra setting dựa vào loại ngày và lưu vào bảng history để tính lương
    //     if (existCheckIn.slideTime === false) {
    //         let delete_props = ["workingDay", "holidayInProvision", "holidayOutProvision"]
    //         data.setting = {}
    //         Object.keys(settingTime).map(prop => {
    //             if (!delete_props.includes(prop)) {
    //                 data.setting[prop] = settingTime[prop];
    //             }
    //         })
    //     } else if (existCheckIn.slideTime === true) {
    //         data.setting = {
    //             ...settingSlide
    //         }
    //     } else {
    //         throw new ApiException(400, "slidetime không hợp lệ");
    //     }
    // }
    /**
     * 
     * API này gọi cả khi checkout lần đầu và khi update checkout
     */
    async checkOut({ request, response }) {
        let input = request.body
        input.date = Common.checkFormatDate(input.date);
        let allowFields = {
            date: "string!",
            totalTime: "number!",
            constructions: [{ constructionId: "objectid!", workTime: "number!" }]
        }
        let existCheckIn = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            checkInStatus: true,
            date: input.date,
            endTime: { $exists: true }
        })
        if (!existCheckIn) throw new ApiException(400, "Not_Check_In");

        //nếu chưa check out thì thêm trg
        if (!existCheckIn.checkOutStatus) {
            allowFields = {
                ...allowFields,
                latitudeOut: "number!",
                longitudeOut: "number!",
                workOnDayOff: "boolean"
            }
        };

        let data = this.validate(input, allowFields, { removeNotAllow: true });
        //check construction exist in DB
        let promise = data.constructions.map(construction => {
            return this.ConstructionModel.getById(construction.constructionId);
        });
        let constructions = await Promise.all(promise)

        //mảng lưu trữ slide time của công trường để check có công trường nào khác slide time không
        let slideTimes = []
        data.constructions = data.constructions.filter((construction, index) => {
            if (constructions[index]) {
                //check xem công trường có phải slide time hay không
                const { schedules } = constructions[index]
                if (Array.isArray(schedules)) {
                    const todaySchedule = schedules.find(schedule => schedule.start === data.date);
                    if (todaySchedule) {
                        slideTimes.push(Boolean(todaySchedule.slideTime));
                    }
                    else {
                        slideTimes.push(false);
                    }
                }
                return construction
            }
        })

        let slideTimeObj = {}
        slideTimes.map(item => slideTimeObj[item] = true)
        if (Object.keys(slideTimeObj).length > 1) throw new ApiException(400, "không thể chọn công trường ngày và slidetime trong cùng 1 ngày");

        //validate thời gian làm tại công trường
        let total_workTime = 0
        data.constructions.map(construction => {
            total_workTime += construction.workTime || 0
        })

        if (total_workTime > data.totalTime) {
            throw new ApiException(422, "Update_Check_Out_Warning");
        }

        //trường hợp là update check out khi đã check out trong ngày
        if (existCheckIn.checkOutStatus) {
            //chỉ cho update trong ngày
            let offset = moment().diff(moment(data.date), 'days')
            if (offset > 1 && existCheckIn.checkOutStatus) {
                throw new ApiException(400, "Expired_Update_Warning");
            }
        }

        data = {
            ...data,
            checkOutStatus: true,
            total_workTime: total_workTime
        }

        //nếu mà chưa check out thì thêm setting time vào để tính lương
        //add setting time and night to history
        let user = await this.UserModel.getById(Auth.user._id) || {};
        let { timeId = '' } = user;
        if (!timeId) throw new ApiException(400, "Người dùng chưa được gán pattern ca ngày!");
        let settingTime = await this.SetTimeModel.getTodayTimeSetting(existCheckIn.startTime, timeId);
        let settingSlide = await this.SetTimeModel.getTodaySlideTimeSetting(existCheckIn.startTime);
     
        //lấy ra setting dựa vào loại ngày và lưu vào bảng history để tính lương
        if (existCheckIn.slideTime === false) {
            let delete_props = ["workingDay", "holidayInProvision", "holidayOutProvision"]
            data.setting = {}
            Object.keys(settingTime).map(prop => {
                if (!delete_props.includes(prop)) {
                    data.setting[prop] = settingTime[prop]
                }
            })
        } else if (existCheckIn.slideTime === true) {
            data.setting = {
                ...settingSlide
            }
        } else {
            throw new ApiException(400, "slidetime không hợp lệ");
        }

        let result = await this.Model.update(existCheckIn._id, data);
        return result;

    }
    /**
     * 
     * API dùng để lưu thời gian checkout khi công nhân nhấn vào nút checkout
     */
    async setCheckoutTime({ request, response }) {
        let input = request.body;
        input.date = Common.checkFormatDate(input.date)
        let allowFields = {
            date: 'string!'
        }
        let data = this.validate(input, allowFields, { removeNotAllow: true });

        let existCheckIn = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            checkInStatus: true,
            date: data.date,
            endTime: { $exists: false }
        })
        if (!existCheckIn) throw new ApiException(400, "không thể update giờ checkout!");
        let user = await this.UserModel.getById(Auth.user._id) || {};
        let { timeId = '' } = user;
        if (!timeId) throw new ApiException(400, "Người dùng chưa được gán pattern ca ngày!");
        let settingTime = await this.SetTimeModel.getTodayTimeSetting(existCheckIn.startTime, timeId);
        let { roundEnd, roundEndType } = settingTime
        data.endTime = new Date()
        
        data.totalTime = Common.getOnlyHoursMinutes(new Date()) - new Date(existCheckIn.startTime)
        //tính thời gian kết thúc làm tròn
        data._endTime = Common.roundingTime({
            root: moment().startOf('day').toISOString(),
            time: data.endTime,
            range: roundEnd,
            type: roundEndType
        })
        data._endTime = new Date(data._endTime)

        let result = await this.Model.update(existCheckIn._id, data);
        return result;
    }
    /**
     * 
     * API dùng để cập nhật công trường lúc mà người dùng chọn thêm hoặc xóa công trường
     * - hỗ trợ tính lại slide time khi người dùng thay đổi list công trường checkin
     */
    async updateConstructions({ request, response }) {
        let input = request.body;
        input.date = Common.checkFormatDate(input.date)
        let allowFields = {
            date: 'string!',
            constructions: [{ constructionId: "objectid", workTime: "number" }]
        }
        let data = this.validate(input, allowFields, { removeNotAllow: true });

        let existCheckIn = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            checkInStatus: true,
            date: data.date,
        });

        //xét nếu lúc checkin chưa chó slide time thì lấy slidetime từ list
        // if (existCheckIn.slideTime == null) {
        //nếu công nhân đã chọn công trường thì gán slidetime phần từ thứ nhất
        if (data.constructions.length) {
            data.slideTime = await this.getSlideTime(data.constructions, data.date);
        } else {
            //không chọn thì gán slidetime === null
            data.slideTime = null
            data.checkOutStatus = false;
        }
        // }
        console.log("data.slideTime ", data.slideTime)
        if (!existCheckIn) throw new ApiException(400, "Không có checkin thì sao thêm công trường!");

        let result = await this.Model.update(existCheckIn._id, data);
        return result;
    }
}

module.exports = WorkerController
