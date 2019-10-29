const BaseController = use("./BaseController")
const BadModel = use("App/Models/Bad")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require('mongodb')
const Common = use("App/Common/common")

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class BadController extends BaseController {
    constructor() {
        super()

        this.Model = new BadModel()
    }

    async index({ request, response }) {
        console.log("Chui vao day")
        let allowFields = {
            _id: 1,
            code: 1,
            name: 1,
            img: 1,
            monerOld: 1,
            moneyNew: 1,
            typeBad: 1,
            typeWoods: 1,
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
            code: 1,
            name: 1,
            img: 1,
            monerOld: 1,
            moneyNew: 1,
            typeBad: 1,
            typeWoods: 1,
        }
        return await super.detail({ request, response, allowFields })
    }

    async store({ request, response }) {
        let input = request.body
            //allowFields là object các trường được phép lưu vào db
        let allowFields = {
            code: "string!",
            name: "string!",
            code: "string!",
            name: "string!",
            img: "string!",
            monerOld: "string!",
            moneyNew: "string!",
            typeBad: "string!",
            typeWoods: "string!",
        }
        const data = this.validate(input, allowFields, { removeNotAllow: true })

        let existCode = await this.Model.getOne({
            code: data.code
        })
        let existName = await this.Model.getOne({
            name: data.name
        })
        if (existCode || existName) throw new ApiException(400, "Bad_Code_Exist")
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
            code: "string!",
            name: "string!",
            code: "string!",
            name: "string!",
            img: "string!",
            monerOld: "string!",
            moneyNew: "string!",
            typeBad: "string!",
            typeWoods: "string!",
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })

        let existCode = await this.Model.getOne({
            code: data.code
        })
        let existName = await this.Model.getOne({
            name: data.name
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
            throw new ApiException(400, "Bad_Code_Exist")
        }
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

module.exports = BadController