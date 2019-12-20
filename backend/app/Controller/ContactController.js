const BaseController = use("./BaseController")
const ContactModel = use("App/Models/Contact")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require('mongodb')
const Common = use("App/Common/common")

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class ContactController extends BaseController {
    constructor() {
        super()
        this.Model = new ContactModel()
    }

    async index({ request, response }) {
        let allowFields = {
            _id: 1,
            name: 1,
            phone: 1,
            mail: 1,
            address: 1,
            date: 1,
            content: 1,
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
            phone: 1,
            mail: 1,
            address: 1,
            date: 1,
            content: 1,
        }
        return await super.detail({ request, response, allowFields })
    }

    async store({ request, response }) {
        let input = request.body
            //allowFields là object các trường được phép lưu vào db
        let allowFields = {
            name: "string!",
            phone: "string!",
            mail: "string!",
            address: "string!",
            date: "date",
            content: "string!",
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })
            // check code, name khác nhau
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
            name: "string!",
            phone: "string!",
            mail: "string!",
            address: "string!",
            date: "date",
            content: "string!",
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
            // let existCode = await this.Model.getOne({
            //     code: data.code
            // })
            // let existName = await this.Model.getOne({
            //     name: data.name
            // })
        let result = await this.Model.update(id, data)
            // let check = false
            // if (!existCode && !existName) check = true
            // if (existName && !existCode) {
            //     if (existName._id == id) check = true
            // }
            // if (existCode && !existName) {
            //     if (existCode._id == id) check = true
            // }
            // if (existName && existCode) {
            //     if (existCode._id == id && existName._id == id) check = true
            // }
            // if (check) {
            //     result = await this.Model.update(id, data)
            // } else {
            //     throw new ApiException(400, "Bad_Code_Exist")
            // }
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

module.exports = ContactController