const BaseController = use("./BaseController")
const PostsModel = use("App/Models/Posts")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require('mongodb')
const Common = use("App/Common/common")

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class PostsController extends BaseController {
    constructor() {
        super()
        this.Model = new PostsModel()
    }

    async index({ request, response }) {
        let allowFields = {
            _id: 1,
            title: 1,
            image: 1,
            number: 1,
            summary: 1,
            contentStart: 1,
            contentEnd: 1,
            data: 1,

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
            title: 1,
            image: 1,
            number: 1,
            summary: 1,
            contentStart: 1,
            contentEnd: 1,
            data: 1,

        }
        return await super.detail({ request, response, allowFields })
    }

    async store({ request, response }) {
        let input = request.body
            //allowFields là object các trường được phép lưu vào db
        let allowFields = {
            title: "string!",
            image: "string!",
            number: "string!",
            summary: "string!",
            contentStart: "string!",
            contentEnd: "string!",
            data: [
                { 
                    title: "string!",
                    image: "string!",
                    content: [
                        {
                            listConten: "string!", 
                        }
                    ]
                }
            ]
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
        // let existCode = await this.Model.getOne({
        //     code: data.code
        // })
        // let existName = await this.Model.getOne({
        //     name: data.name
        // })
        // if (existCode || existName) throw new ApiException(400, "Bad_Code_Exist")
        let result = await this.Model.insertOne(data)
        return result
    }

    async update({ request, response }) {
        let id = request.params.id
        if (!id) throw new ApiException(422, "Id_Required")
        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")
        if (exist.code == "All") {
            throw new ApiException(400, "Bad_Update_Warning")
        }

        //allowFields là object các trường được phép lưu vào db
        let allowFields = {
            title: "string!",
            image: "string!",
            number: "string!",
            summary: "string!",
            contentStart: "string!",
            contentEnd: "string!",
            data: [
                { 
                    title: "string!",
                    image: "string!",
                    content: [
                        {
                            listConten: "string!", 
                        }
                    ]
                }
            ]
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        let result = await this.Model.update(id, data)
        return result
    }

    async delete({ request, response }) {
        let id = request.query.ids
        if (!id) throw new ApiException(422, "Id_Required")
        for (let i of id) {
            let exist = await this.Model.getById(ObjectId(i))
            if (!exist) throw new ApiException(404, "No_Object")
            if (exist.code == "All") {
                throw new ApiException(400, "Bad_Del_Warning")
            }
        }
        id = []
        return await super.delete({ request, response })
    }
}

module.exports = PostsController