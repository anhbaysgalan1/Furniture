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
            start: "string!",
            currentTime: "date!",
            startDate: "string!",
            endDate: "string!"
        }

        let data = this.validate(input, allowFields, { removeNotAllow: true })
        let result = {}
        //if exist one document that user check in but did not check out, then return that result
        let [lastOnlyCheckIn] = await this.Model.getLastOnlyCheckIn(Auth.user._id)
        if (lastOnlyCheckIn) {
            result = {
                ...lastOnlyCheckIn,
                _id: lastOnlyCheckIn.startTime,
                label: "only checkin",
                day: lastOnlyCheckIn.date
            }
        } else {
            let yesterday = moment(data.start).subtract(1, "day").format('YYYY-MM-DD')
            let today = data.start

            //get constructions
            let constructions = {
                yesterday: await this.ConstructionModel.getByUserId(Auth.user._id, yesterday),
                today: await this.ConstructionModel.getByUserId(Auth.user._id, today),
            }

            // return constructions
            //get the root of the day in nomal and night day
            let rootDay = {
                nomal: (await this.SetTimeModel.getTodayTimeSetting(data.currentTime) || {})[this.config.nomalRoot],
                night: (await this.SetTimeModel.getTodayNightSetting(data.currentTime) || {})[this.config.nightRoot]
            }
            // get the result
            result = await this.Model.getInitCheckTime(data, constructions, rootDay)
        }
        let constructions = result.constructions
        let Promises = constructions.map(con => {
            if (con._id && !con.constructionId) con.constructionId = con._id
            let project = {
                name: 1, code: 1, _id: 1, content: 1, address: 1
            }
            if (request.permissions.profit) {
                project = {
                    ...project,
                    contructionProfit: 1, amount: 1, cost: 1
                }
            }
            return this.ConstructionModel.getById(con.constructionId, project)
        })

        constructions = await Promise.all(Promises)
        constructions = constructions.filter(construction => construction)
        
        result.constructions = await this.Model.mergeConstructions(constructions, result.constructions)
        result.constructionDropdown = await this.ConstructionModel.getValidList({name: 1, code: 1, address: 1})
        return result
    }

    async checkIn({ request, response }) {
        let input = request.body

        input.isoDate = Common.string_to_ISO(input.date)
        input.startTime = Common.getOnlyHoursMinutes(new Date())
        let allowFields = {
            latitudeIn: "number!",
            longitudeIn: "number!",
            startTime: "date!",
            date: "string!",
            isoDate: "date!"
        }

        let data = this.validate(input, allowFields, { removeNotAllow: true })

        let exist = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            date: data.date,
            checkInStatus: true,
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
        data.isNormalDay = true
        data.constructions = []
        //add setting time and night to history
        let settingTime = await this.SetTimeModel.getTodayTimeSetting(data.startTime);
        let settingNight = await this.SetTimeModel.getTodayNightSetting(data.startTime);

        let RoundTime = {
            roundStart: settingTime.roundStart,
            roundStartType: settingTime.roundStartType,
            roundEnd: settingTime.roundEnd,
            roundEndType: settingTime.roundEndType
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

        //lấy ra setting dựa vào loại ngày và lưu vào bảng history để tính lương
        if (data.isNormalDay) {
            let delete_props = ["workingDay", "holidayInProvision", "holidayOutProvision"]
            data.setting = {}
            Object.keys(settingTime).map(prop => {
                if (!delete_props.includes(prop)) {
                    data.setting[prop] = settingTime[prop]
                }
            })
        } else {
            data.setting = {
                ...settingNight,
                ...RoundTime
            }
        }

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

        
        let result = await this.Model.insertOne(data)
        return result
    }

    async checkOut({ request, response }) {
        let input = request.body   
        input.date = Common.checkFormatDate(input.date)
        let allowFields = {
            date: "string!",
            totalTime: "number!",
            constructions: [{ constructionId: "objectid!", workTime: "number!" }]
        }
        let existCheckIn = await this.Model.getOne({
            userId: ObjectId(Auth.user._id),
            checkInStatus: true,
            date: input.date,
            checkInStatus: true
        })
        if (!existCheckIn) throw new ApiException(400, "Not_Check_In");

        //nếu chưa check out thì thêm trg
        if (!existCheckIn.checkOutStatus) {
            allowFields = {
                ...allowFields,
                latitudeOut: "number!",
                longitudeOut: "number!",
                endTime: "date!",
                workOnDayOff: "boolean"
            }
        };

        let data = this.validate(input, allowFields, { removeNotAllow: true });

        //nếu có endTime thì làm tròn luôn endTime
        if (data.endTime) {
            let { startOfDay, roundEnd, roundEndType } = existCheckIn.setting
            data._endTime = Common.roundingTime({
                root: startOfDay,
                time: data.endTime,
                range: roundEnd,
                type: roundEndType
            })
            data._endTime = new Date(data._endTime)
        }

        //check construction exist in DB
        let promise = data.constructions.map(construction => {
            return this.ConstructionModel.getById(construction.constructionId);
        });
        let constructions = await Promise.all(promise)

        data.constructions = data.constructions.filter((construction, index) => {
            if (constructions[index]) {
                return construction
            }
        })

        data.constructions = await this.ConstructionModel.insertWorkNightProps(data.constructions);

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
        } else {
            if (data.endTime > new Date()) {
                throw new ApiException(400, "Bạn đang check out giờ lớn hơn giờ hiện tại!");
            }
        }

        data = {
            ...data,
            checkOutStatus: true,
            total_workTime: total_workTime
        }

        let result = await this.Model.update(existCheckIn._id, data);
        return result;

    }
}

module.exports = WorkerController
