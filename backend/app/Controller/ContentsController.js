const BaseController = use("./BaseController")
const ContentsModel = use("App/Models/Contents")
const Auth = use("Auth")
const Common = use("App/Common/common")

const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class ContentsController extends BaseController {
    constructor() {
        super()
        this.Model = new ContentsModel()
    }

    async index({ request, response }) {
        let list = await this.Model.aggregation([{
            $sort:
            {
                _id: -1
            }
        }])
            .getForGridTable(request.query, {
                _id: 1,
                title: 1,
                content: 1,
            })
        return list
    }

    async detail({ request, response }) {
        let allowFields = {
            _id: 1,
            title: 1,
            content: 1,
        }
        return await super.detail({ request, response, allowFields })
    }

    async store({ request, response }) {
        let input = request.body
        const allowFields = {
            _id: 'objectid',
            title: 'string',
            content: 'string',
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        let existTitle = await this.Model.getOne({
            title: data.title
        })
        if (existTitle) throw new ApiException(400, "Title_Exist")
        let result = await this.Model.insertOne(data)
        return result
    }

    async update({ request, response }) {
        let id = request.params.id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")

        let input = request.body
        const allowFields = {
            title: 'string',
            content: 'string',
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        let existTitle = await this.Model.getOne({
            title: data.title
        })
        if (existTitle) {
            if (existTitle._id != id) throw new ApiException(400, "Title_Exist")
        }
        return await this.Model.update(id, data)

    }
    async destroy({ request, response }) {
        return await super.destroy({ request, response })
    }
}

module.exports = ContentsController
