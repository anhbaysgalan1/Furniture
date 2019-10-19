const BaseController = use("./BaseController")
const RequestModel = use("App/Models/Request")
const UserModel = use("App/Models/User")
const RoleModel = use("App/Models/Role")
const PermissionModel = use('App/Models/Permission')
const ConstructionModel = use("App/Models/Construction")
const DayOffModel = use("App/Models/DayOff")
const SettingModel = use("App/Models/Setting")
const HistoryModel = use("App/Models/History")

const Auth = use("Auth")
const moment = use("moment")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = use('mongodb')
const Common = use("App/Common/common")
const line_utils = use('../Utils/line_utils')
const { getRequestLineMessage } = use('../../lang/line_message')
var _request = require('request');
const Env = use('Env');

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class RequestController extends BaseController {
    constructor() {
        super()
        this.Model = new RequestModel()
        this.UserModel = new UserModel()
        this.RoleModel = new RoleModel()
        this.ConstructionModel = new ConstructionModel()
        this.PermissionModel = new PermissionModel()
        this.SettingModel = new SettingModel()
        this.DayOffModel = new DayOffModel()
        this.HistoryModel = new HistoryModel()
    }

    async index({ request, response }) {
        let user = Auth.user._id
        let allowFields = {
            date: 1,
            lable: 1,
            isoDate: 1,
            manage1: 1,
            manage2: 1,
            content: 1,
            type: 1,
            data: 1,
            replaceDate: 1,
            status1: 1,
            status2: 1,
            status: 1,
            userId: 1,
            constructId: 1,
            subtractHour: 1,
            User: {
                name: 1,
                code: 1
            }
        }
        // let result = await this.Model.findRequestByUser(ObjectId(user))
        let condition = [
            {
                $sort:
                {
                    _id: -1
                }
            }
        ]
        if (request.query.flag == 'requests') {
            condition = condition.concat([{
                $match: {
                    $or: [{
                        manage1: user
                    },
                    {
                        manage2: user
                    }]
                }
            }])
        }
        if (request.query.flag == 'workers' || request.query.flag == 'calendars') {
            condition = condition.concat([{
                $match: {
                    userId: ObjectId(user),
                    date: request.query.date
                }
            }])
        }
        let result = await this.Model.aggregation(condition).getForGridTable(request.query, allowFields)

        for (let item of result.data) {
            if (Array.isArray(item.data)) {
                for (let construct of item.data) {
                    let listConstruct = await this.ConstructionModel.getOne({ _id: construct.constructionId }, { name: 1, code: 1 })
                    construct = Object.assign(construct, listConstruct)
                    delete construct._id
                }
            }
        }
        return result
    }

    async store({ request, response }) {
        let userId = Auth.user._id
        let input = request.body
        input.isoDate = Common.string_to_ISO(input.date)
        input.userId = userId
        input.status1 = ''
        input.status2 = ''
        input.status = ''

        //allowFields là object các trường được phép lưu vào db
        let allowFields = {
            date: "string!",
            isoDate: "date!",
            userId: "objectid",
            manage1: "objectid!",
            manage2: "objectid!",
            content: "string!",
            type: "number!",
            lable: "string"
        }
        switch (Number(input.type)) {
            case 1:
                allowFields = {
                    ...allowFields,
                    data: [{ constructionId: "objectid!", lateTime: "number!" }]
                }
                input.lable = "Xin đi muộn/về sớm"
                break;
            case 2:
                allowFields = {
                    ...allowFields,
                    data: [{ constructionId: "objectid!", startTime: "date!", endTime: "date!" }]
                }
                input.lable = "Xin OT"
                break;
            case 3:
                input.lable = "Xin nghỉ có lương"
                break;
            case 4:
                input.lable = "Xin đi làm vào ngày nghỉ"
                break;
            case 5:
                allowFields = {
                    ...allowFields,
                    subtractHour: "number"
                }
                input.lable = "Xin nghỉ bù"
                break;
            case 6:
                allowFields = {
                    ...allowFields,
                    replaceDate: "string!",
                }
                input.lable = "Xin nghỉ thay thế"
                break;
            default: throw new ApiException(400, "Invalid_Req_Type")
        }
        let data = this.validate(input, allowFields, { removeNotAllow: true })

        if (data.type === 1) {
            let totalLate = 0
            let constructions = data.data || []
            for (let construction of constructions) {
                if (construction.lateTime <= 0) {
                    throw new ApiException(400, "Input_Time_Warn")
                }
                totalLate += construction.lateTime
            }
            totalLate = moment.duration(totalLate, 'minutes').asMilliseconds();
            data.totalLate = totalLate
        }
        data = {
            ...data,
            messages: [],
            status1: '',      // trạng thái phê duyệt của manager1 ("": chưa phê duyệt, true = phê duyệt, false = không phê duyệt)
            status2: '',      //trạng thái phê duyệt của manager2
            status: '',       // phê duyệt tổng
        }
        //check night work of constructions in OT request
        if (data.type === 2) {
            for (let checkTime of data.data) {
                if (moment(checkTime.endTime) < moment(checkTime.startTime))
                    throw new ApiException(400, "Input_OT_Warn")
            }
            data.data = await this.ConstructionModel.insertWorkNightProps(data.data)
        }
        if (data.type === 3 || data.type === 5) {
            let checkSettingTime = await this.SettingModel.checkTime(data.date)
            let checkHolyday = await this.SettingModel.checkHoliday(data.date)
            if (checkSettingTime) throw new ApiException(400, "Req_DayOff_Warn")
            if (checkHolyday) throw new ApiException(400, "Req_Holiday_Warn")
        }
        if (data.type === 6) {
            if (moment(data.replaceDate) > moment(data.date).add(7, 'day') || moment(data.replaceDate) < moment(data.date).subtract(7, 'day')) {
                throw new ApiException(400, "Choose_ReDate_Warn")
            }
        }

        // check xem ngày nghỉ đã tồn tại trong hệ thống chưa
        let dayOffWarn = true
        let dateToCheck
        data.replaceDate ? dateToCheck = data.replaceDate : dateToCheck = data.date
        dayOffWarn = await this.DayOffModel.checkValidateDay(dateToCheck, data.userId)
        if (dayOffWarn) {
            throw new ApiException(400, "DayOff_Exist")
        }

        let userLevel = await this.checkUserLevel(data.manage1, data.manage2)
        if (!userLevel) throw new ApiException(405, "User_Level_Warn")

        let result = await this.Model.insertOne(data)

        //gửi thông báo qua line
        await this.sendMessageToLine(result)
        return result
    }
    //phê duyệt xin phép
    async update({ request, response }) {
        let id = request.body._id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")
        let allowFields = {}
        const loginUser = String(Auth.user._id)
        let isManager1 = false
        let isManager2 = false

        let { allow_level_1, allow_level_2 } = request.permissions

        //check xem thực sự phải là người phê duyệt cấp 1 không
        if (allow_level_1) {
            if (loginUser === String(exist.manage1)) {
                isManager1 = true
                allowFields = {
                    ...allowFields,
                    status1: "boolean"
                }
            }

        }

        //check xem thực sự phải là người phê duyệt cấp 2 không
        if (allow_level_2) {
            if (loginUser === String(exist.manage2)) {
                isManager2 = true
                allowFields = {
                    ...allowFields,
                    status2: "boolean"
                }
            }

        }


        let data = this.validate(request.body, allowFields, { removeNotAllow: true })
        let status1 = "", status2 = ""
        //check xem có trùng người phê duyệt không
        if (String(exist.manage1) === String(exist.manage2)) {
            //check xem các status chưa được duyệt
            if (exist.status1 === "" && exist.status2 === "") {
                if (data.status2 === false || data.status1 === false) {
                    status1 = false
                    status2 = false
                }
                if (data.status2 === true || data.status1 === true) {
                    status1 = true
                    status2 = true
                }
            }
        } else {
            if (isManager1 && exist.status1 === "") {
                status1 = data.status1
                status2 = exist.status2
            } else if (isManager2 && exist.status2 === "") {
                status1 = exist.status1
                status2 = data.status2
            }
        }

        if (status1 && status2) {
            data.status = true
        }
        else {
            if (status1 === false || status2 === false) {
                data.status = false
            }
        }
        data.status1 = status1
        data.status2 = status2

        return await this.Model.update(id, data)
    }

    //xin phép lại
    async reUpdate({ request, response }) {
        let id = request.body._id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")
        const loginUser = String(Auth.user._id)
        if (loginUser !== String(exist.userId)) {
            throw new ApiException(405, "User_Req_Check")
        }
        let allowFields = {
            manage1: "objectid!",
            manage2: "objectid!",
            content: "string!",
            subtractHour: "number!"
        }

        if (exist.type == 1) {
            allowFields = {
                ...allowFields,
                data: [{ constructionId: "objectid!", lateTime: "number!" }]
            }
        }
        if (exist.type == 2) {
            allowFields = {
                ...allowFields,
                data: [{ constructionId: "objectid!", startTime: "date!", endTime: "date!" }]
            }
        }
        if (exist.type == 6) {
            allowFields = {
                ...allowFields,
                replaceDate: "string!"
            }
        }
        if (exist.type == 5) {
            allowFields = {
                ...allowFields,
                subtractHour: "number!"
            }
        }
        let data = this.validate(request.body, allowFields, { removeNotAllow: true })

        if (exist.type == 1) {
            let totalLate = 0
            let constructions = data.data || []
            for (let construction of constructions) {
                if (construction.lateTime <= 0) {
                    throw new ApiException(400, "Input_Time_Warn")
                }
                totalLate += construction.lateTime
            }
            totalLate = moment.duration(totalLate, 'minutes').asMilliseconds();
            data.totalLate = totalLate
        }
        if (exist.type === 2) {
            for (let checkTime of data.data) {
                if (moment(checkTime.endTime) < moment(checkTime.startTime))
                    throw new ApiException(400, "Input_OT_Warn")
            }
        }
        if (exist.type === 6) {
            if (moment(data.replaceDate) > moment(exist.date).add(7, 'day') || moment(data.replaceDate) < moment(exist.date).subtract(7, 'day')) {
                throw new ApiException(400, "Choose_ReDate_Warn")
            }
        }
        

        let dayOffWarn = true
        let dateToCheck
        data.replaceDate ? dateToCheck = data.replaceDate : dateToCheck = data.date
        dayOffWarn = await this.DayOffModel.checkValidateDay(dateToCheck, data.userId)
        if (dayOffWarn) {
            throw new ApiException(400, "DayOff_Exist")
        }

        data = {
            ...data,
            status1: "",
            status2: "",
            status: "",
        }
        let userLevel = await this.checkUserLevel(data.manage1, data.manage2)
        if (!userLevel) throw new ApiException(405, "User_Level_Warn")
        let result = await this.Model.update(id, data)
        //gửi thông báo qua line
        await this.sendMessageToLine(result)
        return result
    }

    async checkUserLevel(manage1, manage2) {
        let isLevel1 = false
        let roleManage1 = await this.UserModel.getOne({ _id: manage1 }, { roleId: 1 })
        let permissionManage1 = await this.RoleModel.getOne({ _id: roleManage1.roleId }, { permissionIds: 1 })
        for (let per of permissionManage1.permissionIds) {
            let findLevel1 = await this.PermissionModel.getOne({ _id: per, key: "allow_level_1" }, { key: 1 })
            if (findLevel1) isLevel1 = true
        }
        let isLevel2 = false
        let roleManage2 = await this.UserModel.getOne({ _id: manage2 }, { roleId: 1 })
        let permissionManage2 = await this.RoleModel.getOne({ _id: roleManage2.roleId }, { permissionIds: 1 })
        for (let per of permissionManage2.permissionIds) {
            let findLevel2 = await this.PermissionModel.getOne({ _id: per, key: "allow_level_2" }, { key: 1 })
            if (findLevel2) isLevel2 = true
        }
        if (isLevel1 && isLevel2) return true
        return false
    }

    async sendMessageToLine(result) {
        if (!result) return false
        //nếu thành công thì gửi tin nhắn qua line
        let managers_id = [result.manage1, result.manage2];
        let manages_access_tokens = managers_id.map((id) => this.UserModel.getById(id, { access_token_line: 1 }))
        let { name } = await this.UserModel.getById(Auth.user._id, { _id: 0, name: 1 })
        Promise.all(manages_access_tokens).then(data => {
            let access_tokens = []
            //lấy id của người cần gửi
            data.map(item => {
                if (item.access_token_line && !access_tokens.includes(item.access_token_line))
                    access_tokens.push(item.access_token_line)
            })
            //lấy tin nhắn theo loại xin phép
            let message = getRequestLineMessage(name, result.type, result.content)
            //gửi xin phép
            line_utils.sendLineMessages(access_tokens, message)
        })
    }

    async sendMessage({ request, response }) {

        let allowFields = {
            _id: 'objectid!',
            message: 'string!'
        }

        let data = this.validate(request.body, allowFields, { removeNotAllow: false })
        let _id = data._id
        let userId = Auth.user._id
        await this.Model.accessMessage(_id, userId)

        data = {
            message: data.message,
            userId: ObjectId(Auth.user._id),
            time: moment().toISOString()
        }

        let result = await this.Model.sendMessage(_id, data)

        for (let index in result.messages) {
            let mess = result.messages[index]
            let user = await this.UserModel.getById(mess.userId, { _id: 0, name: 1, username: 1 })
            result.messages[index] = {
                ...result.messages[index],
                ...user
            }
        }

        return result
    }
    //Dùng để get người phê duyệt cấp 1 cấp 2
    async getApprover({ request, response }) {
        let allow_level_1 = await this.PermissionModel.getOne({ key: 'allow_level_1' })
        let allow_level_2 = await this.PermissionModel.getOne({ key: 'allow_level_2' })
        let role_level1 = await this.RoleModel.getRoleByPermissions(allow_level_1._id)
        let role_level2 = await this.RoleModel.getRoleByPermissions(allow_level_2._id)
        let result = {
            user_level1: [],
            user_level2: []
        }

        if (role_level1) {
            let role_level1_array = []
            role_level1.map(role => {
                role_level1_array.push(ObjectId(role._id))
            })
            result.user_level1 = await this.UserModel.getApproverByRole(role_level1_array)
        }

        if (role_level2) {
            let role_level2_array = []
            role_level2.map(role => {
                role_level2_array.push(ObjectId(role._id))
            })
            result.user_level2 = await this.UserModel.getApproverByRole(role_level2_array)
        }
        return result
    }

    async getListMessages({ request, response }) {

        let allowFields = {
            _id: 'objectid!'
        }

        let data = this.validate(request.query, allowFields, { removeNotAllow: false })
        let result = await this.Model.getById(data._id, { _id: 0, messages: 1 })

        for (let index in result.messages) {
            let mess = result.messages[index]
            let user = await this.UserModel.getById(mess.userId, { _id: 0, name: 1, username: 1 })
            result.messages[index] = {
                ...result.messages[index],
                ...user
            }
        }

        return result
    }
    async destroy({ request, response }) {
        return await super.destroy({ request, response })
    }
    async detail({ request, response }) {
        let allowFields = {
            _id: 1,
            date: 1,
            userId: 1,
            manage1: 1,
            manage2: 1,
            status1: 1,
            status2: 1,
            status: 1,
            content: 1,
            type: 1,
            lable: 1,
            data: 1,
            replaceDate: 1,
            subtractHour: 1
        }
        let result = await super.detail({ request, response, allowFields })
        let listConstruction = []
        if (Array.isArray(result.data)) {
            for (let construct of result.data) {
                let getConstructionName = await this.ConstructionModel.getOne({ _id: ObjectId(construct.constructionId) }, { name: 1, code: 1 })
                listConstruction.push(getConstructionName)
            }
        }
        result = {
            ...result,
            listConstruction
        }
        result.userId = await this.UserModel.getById(result.userId, { _id: 1, name: 1, username: 1 })
        result.manage1 = await this.UserModel.getById(result.manage1, { _id: 1, name: 1, username: 1 })
        result.manage2 = await this.UserModel.getById(result.manage2, { _id: 1, name: 1, username: 1 })
        return result
    }

    async checkExistRequest({ request, response }) {
        let input = request.query
        input.userId = Auth.user._id
        let requestType = await this.Model.checkExistRequest(input.date, ObjectId(input.userId))
        let arrType = []
        requestType.map(item => {
            arrType.push(item.type)
        })
        return arrType
    }

    //kiểm tra số đơn xin phép phải <= số ngày nghỉ có lương/bù còn lại 
    async countDayOffRequest() {
        let userLogin = Auth.user._id
        let year = new Date(moment().startOf('year'))
        let countPaidRequest = await this.Model.count({
            userId: userLogin,
            type: 3,
            status: "",
            isoDate: { $gt: year }
        })
        let countCompenRequest 
        let calculateCompenRequest = await this.Model.getTotalCompenHourRequest(userLogin, year)
        calculateCompenRequest.length > 0 ? countCompenRequest = calculateCompenRequest.pop().totalCompenHour : countCompenRequest = 0
        let data = {}
        data.user = userLogin
        data.countPaidRequest = countPaidRequest
        data.countCompenRequest = countCompenRequest
        return data
    }
    // //lấy token khi người dùng đăng nhập line
    // async updateLineToken({ request, response }) {
    //     console.log('123123')
    //     let input = request.body
    //     let client_id = Env.get("CLIENT_ID", "")
    //     let client_secret = Env.get("CLIENT_SECRET", "")

    //     const allowFields = {
    //         line_code: "string!",
    //         redirect_uri: "string!"
    //     }
    //     const data = this.validate(input, allowFields, { removeNotAllow: true })
    //     _request.post({
    //         url: 'https://notify-bot.line.me/oauth/token', form: {
    //             grant_type: 'authorization_code',
    //             code: data.line_code,
    //             redirect_uri: data.redirect_uri,
    //             client_id: client_id,
    //             client_secret: client_secret
    //         }
    //     }, async function (err, httpResponse, body) {
    //         let res = JSON.parse(body)
    //         if (!res.access_token) {
    //             return ""
    //         } else {
    //             try {
    //                 this.UserModel = new UserModel()
    //                 let access_token_line = JSON.parse(body).access_token
    //                 let result = await this.UserModel.update(Auth.user._id, {
    //                     access_token_line: access_token_line
    //                 })
    //                 return result
    //             } catch(err) {
    //                 throw err
    //             }

    //         }
    //     })
    //     return []
    // }
}

module.exports = RequestController
