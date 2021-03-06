const BaseController = use("./BaseController")
const UserModel = use("App/Models/User")
const moment = use("moment")

const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require("mongodb")
var _request = require('request')
const Env = use('Env')
const Common = use("App/Common/common")

class UserController extends BaseController {
    constructor() {
        super()
        this.Model = new UserModel()
    }
    async login({ request, response }) {
        let input = request.body
        const allowFields = {
            username: "string!",
            password: "string!",
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        const { username, password } = request.body
        let useLoggedin = await this.Model.checkLogin({ username, password })
        if (!useLoggedin) {
            return response.error(401, "Login_Failed")
        }
        let token = Auth.generateJWT({
            _id: useLoggedin._id,
            username: useLoggedin.username,
            name: useLoggedin.name,
        })
        return response.success({
            token: token
        })
    }
    async index({ request, response }) {
        let allowFields = {
            _id: 1,
            name: 1,
            username: 1,
            insert: {
                when: 1
            }
        }
        let result = await this.Model.aggregation([{
            $sort: {
                _id: -1
            }
        }]).getForGridTable(request.query, allowFields)
        return result
    }
    async detail({ request, response }) {
        let allowFields = {
            _id: 1,
            name: 1,
            username: 1
        }
        let result = await super.detail({ request, response, allowFields })
        delete result["password"]
        return result
    }

    async store({ request, response }) {
        let input = request.body
        const allowFields = {
            username: "string!",
            name: "string!",
            password: "string!",
        }
        input.remainByWorkingOnDayOff = 0
            // let addMonth = moment(input.joiningDate).add(6, 'month')
            // if (moment(input.joiningDate).date() != moment(addMonth).date()) {
            // addMonth = addMonth.add(1, 'day')
            // }
            // input.sixMonth = moment(addMonth).format("MM-DD")
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        let existName = await this.Model.getOne({
            username: data.username
        })
        let existCode = await this.Model.getOne({
            code: data.code
        })
        if (existName || existCode) throw new ApiException(400, "User_Code_Exist")
        let result = await this.Model.insertOne(data)
        await this.Model.changePassword(result._id, data.password)
        delete result["password"]
        return result
    }

    async update({ request, response }) {
        let id = request.params.id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")
        const allowFields = {
            name: "string",
            username: "string",
            password: "string",
            code: "string",
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        data.remainTotal = data.remainLastYear + data.remainThisYear
        let existName = await this.Model.getOne({
            username: data.username
        })
        let existCode = await this.Model.getOne({
            code: data.code
        })
        let result = {}
        let check = false
        if (!existCode && !existName) check = true
        if (existName && !existCode) {
            if (existName._id == id) check = true
        }
        if (existCode && !existName) {
            if (existCode._id == id) check = true
        }
        if (existName && existCode) {
            if (existCode._id == id && existName._id == id) check = true
        }
        if (check) {
            result = await this.Model.update(id, data)
        } else {
            throw new ApiException(400, "User_Code_Exist")
        }
        delete result["password"]
        return result
    }


    async delete({ request, response }) {
        let id = request.query.ids
        if (!id) throw new ApiException(422, "Id_Required")
        for (let i of id) {
            let exist = await this.Model.getById(ObjectId(i))
            if (!exist) throw new ApiException(404, "No_Object")
            // let cantDelete = await this.HistoryModel.getOne({ userId: ObjectId(i) }, { _id: 1 })
            if (cantDelete) throw new ApiException(405, "Del_User_Warn")
        }
        id = []
        return await super.delete({ request, response })
    }

    async editPassword({ request, response }) {
        let id = request.params.id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")

        const allowFields = {
            password: "string!"
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        if (data.password) {
            await this.Model.changePassword(id, data.password)
        }
        return []
    }

    //dùng để thêm token vào db
    async updateLineToken({ request, response }) {
        let input = request.body
        let client_id = Env.get("CLIENT_ID", "")
        let client_secret = Env.get("CLIENT_SECRET", "")

        const allowFields = {
            line_code: "string!",
            redirect_uri: "string!"
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        _request.post({
            url: 'https://notify-bot.line.me/oauth/token',
            form: {
                grant_type: 'authorization_code',
                code: data.line_code,
                redirect_uri: data.redirect_uri,
                client_id: client_id,
                client_secret: client_secret
            }
        }, async function(err, httpResponse, body) {
            let res = JSON.parse(body)
            if (!res.access_token) {
                return ""
            } else {
                try {
                    this.UserModel = new UserModel()
                    let access_token_line = JSON.parse(body).access_token
                    let result = await this.UserModel.update(Auth.user._id, {
                        access_token_line: access_token_line
                    })
                    return result
                } catch (err) {
                    throw err
                }

            }
        })
        return []
    }
}

module.exports = UserController