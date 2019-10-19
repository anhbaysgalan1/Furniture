const BaseController = use("./BaseController")
const PositionModel = use("App/Models/Position")
const UserModel = use("App/Models/User")
const { ObjectId } = use('mongodb'); // or ObjectID 
const Common = use("App/Common/common")

const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class PositionController extends BaseController {
  constructor() {
    super()
    this.Model = new PositionModel()
    this.UserModel = new UserModel()
  }

  async index({ request, response }) {
    let allowFields = {
      _id: 1,
      code: 1,
      name: 1,
      remuneration: 1,
      insert: {
        when: 1
      }
    }
    let result = await this.Model.aggregation([
      {
        $sort:
        {
          _id: -1
        }
      }
    ]).getForGridTable(request.query, allowFields)
    for (let position of result.data) {
      let userNumber = await this.UserModel.countUser({ positionId: ObjectId(position._id) })
      position['userNumber'] = userNumber
    }

    return result
  }

  async detail({ request, response }) {
    let allowFields = {
      _id: 1,
      code: 1,
      name: 1,
      remuneration: 1,
    }
    return await super.detail({ request, response, allowFields })
  }

  async store({ request, response }) {
    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    const allowFields = {
      code: "string!",
      name: "string!",
      remuneration: "number!",
    }
    const data = this.validate(input, allowFields, { removeNotAllow: true })
    let existCode = await this.Model.getOne({
      code: data.code
    })
    if (existCode) throw new ApiException(400, "Position_Code_Exist")
    //insert to database
    let result = await this.Model.insertOne(data)
    return result
  }

  // async update({ request, response }) {
  //   //allowFields là object các trường được phép lưu vào db
  //   let allowFields = {
  //     _id: 1
  //   }
  //   return await super.update({ request, response, allowFields })
  // }

  async update({ request, response }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "Id_Required")

    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(404, "No_Object")

    //allowFields là object các trường được phép lưu vào db
    const allowFields = {
      code: "!string",
      name: "string!",
      remuneration: "number!",
    }
    const data = this.validate(request.body, allowFields, { removeNotAllow: false })
    // let existName = await this.Model.getOne({
    //   name: data.name
    // })
    let existCode = await this.Model.getOne({
      code: data.code
    })
    if (existCode) {
      if (existCode._id != id) throw new ApiException(400, "Position_Code_Exist")
    }
    return await this.Model.update(id, data)
  }

  async delete({ request, response }) {
    let id = request.query.ids
    if (!id) throw new ApiException(422, "Id_Required")
    for (let i of id) {
      let exist = await this.Model.getById(ObjectId(i))
      if (!exist) throw new ApiException(404, "No_Object")
      let cantDelete = await this.UserModel.getOne({ positionId: exist._id })
      if (cantDelete) throw new ApiException(405, "Position_Has_User")
    }
    return await super.delete({ request, response })
  }
}

module.exports = PositionController
