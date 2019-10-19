const BaseController = use("./BaseController")
const ReportModel = use("App/Models/Report")
const UserModel = use("App/Models/User")
const AreaModel = use("App/Models/Area")
const ConstructionModel = use("App/Models/Construction")
const Auth = use("Auth")
const moment = use("moment")

const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = use('mongodb');
const Common = use("App/Common/common")

const line_utils = use('../Utils/line_utils')
const { getReportLineMessage } = use('../../lang/line_message')
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class ReportController extends BaseController {
    constructor() {
        super()
        this.Model = new ReportModel()
        this.UserModel = new UserModel()
        this.ConstructionModel = new ConstructionModel()
        this.AreaModel = new AreaModel()
    }

    async index({ request, response }) {
        let user = Auth.user._id
        let getAreaOfUser = await this.UserModel.getOne(ObjectId(user), { areaId: 1 })
        let condition = [
            {
                $sort:
                {
                    _id: -1
                }
            }
        ]
        let checkAreaOfUser = await this.AreaModel.getOne(ObjectId(getAreaOfUser.areaId), { code: 1 })
        if (!checkAreaOfUser) {
            condition = condition.concat([{
                $match: {
                    userId: user
                }
            }])
        }
        else if (checkAreaOfUser.code != 'All') {
            condition = condition.concat([{
                $match: {
                    $or: [
                        {
                            areaId: getAreaOfUser.areaId
                        },
                        {
                            userId: user
                        }
                    ]
                }
            }])
        }
        let result = await this.Model.aggregation(condition).getForGridTable(request.query, {
            date: 1,
            report: 1,
            subject: 1,
            content: 1,
            titleContent: 1,
            contractor: 1,
            construction_unit: 1,
            // status: 1,
            warning: 1,
            listUserSeen: 1,
            Construction: {
                _id: 1,
                code: 1,
                name: 1,
                cost: 1,
                amount: 1,
            },
            User: {
                _id: 1,
                code: 1,
                name: 1,
                username: 1
            },
            Area: 1,
            insert: {
                when: 1
            }
        })
        let areas = await this.AreaModel.findByCondition({}, { name: 1 });
        result.areas = areas
        return await result
    }

    // Loại bỏ các công tường hết hạn
    async listConstruction({ request, response }) {
        let allowFields = {
            code: 1,
            name: 1,
            dateStart: 1,
            dateEnd: 1,
            amount: 1,
            cost: 1,
            contructionProfit: 1,
        }
        let today = new Date(moment().utc().startOf('day').toISOString())
        let list = await this.ConstructionModel.findByCondition(
            {
                dateEnd: {
                    $gte: today
                }
            }, allowFields)
        return list
    }

    async detail({ request, response }) {
        let allowFields = {
            _id: 1,
            date: 1,
            warning: 1,
            report: 1,
            // status: 1,
            subject: 1,
            constructionId: 1,
            userId: 1,
            areaId: 1,
            content: 1,
            titleContent: 1,
            contractor: 1,
            construction_unit: 1,
            listUserSeen: 1,
        }
        let result = await super.detail({ request, response, allowFields })
        if (result) {
            result.construction = await this.ConstructionModel.getById(result.constructionId, {
                code: 1,
                name: 1,
                contructionProfit: 1,
                cost: 1,
                amount: 1
            }) || {}
            result.area = await this.AreaModel.getById(result.areaId, {
                code: 1,
                name: 1
            }) || {}
        }
        return result
    }
    async getByUserIdAndDate({ request, response }) {
        let input = request.query
        let allowFields = {
            date: "string!",
            userId: "objectid!"
        }
        let dataShow = {
            code: 1,
            name: 1
        }
        let { profit } = request.permissions
        if (profit) {
            dataShow = {
                ...dataShow,
                amount: 1,
                cost: 1,
                contructionProfit: 1
            }
        }

        let data = this.validate(input, allowFields, { removeNotAllow: true })
        return await this.ConstructionModel.listConstructionByUserId(data.userId, data.date, dataShow)
    }

    async store({ request, response }) {
        let input = request.body
        input.userId = Auth.user._id
        if (input.constructionId == null) {
            input.constructionId = new ObjectId()
        }
        // input.status = false
        //allowFields là object các trường được phép lưu vào db
        const allowFields = {
            date: "date!",
            report: "string",
            warning: "boolean",
            subject: "string",
            userId: "objectid",
            areaId: "objectid!",
            content: "string",
            titleContent: 'string',
            contractor: "string",
            construction_unit: "string",
            constructionId: "objectid"
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        let result = await this.Model.insertOne(data)
        //nếu thành công thì gửi tin nhắn qua line
        // let { areaId } = await this.UserModel.getById(current_user)
        let areaId = result.areaId
        let area_all_id = await this.AreaModel.getAreaAll()
        if (!areaId) {
            console.log("Không tồn tại id khu vực trong người dùng")
            return result
        }
        let access_tokens = await this.UserModel.getLineTokensByAreaId(areaId, area_all_id)
        let { name } = await this.UserModel.getById(Auth.user._id, { _id: 0, name: 1 })
        let message = getReportLineMessage(name)
        line_utils.sendLineMessages(access_tokens, message)
        return result
    }

    async update({ request, response }) {
        //allowFields là object các trường được phép lưu vào db
        let id = request.body._id
        if (!id) throw new ApiException(422, "Id_required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")
        if (Array.isArray(exist.listUserSeen)) {
            for (let list of exist.listUserSeen) {
                if (Auth.user._id.toString() === list.toString()) {
                    return false
                }
            }
        }
        let result = await this.Model.update(id, {
            '$push': {
                listUserSeen: Auth.user._id
            }
        })
        return result
    }

    async destroy({ request, response }) {
        return await super.destroy({ request, response })
    }
}

module.exports = ReportController
