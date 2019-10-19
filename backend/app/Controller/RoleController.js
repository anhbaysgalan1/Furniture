const BaseController = use("./BaseController")
const RoleModel = use("App/Models/Role")
const UserModel = use("App/Models/User")
const PermissionModel = use("App/Models/Permission")

const Auth = use("Auth")
const Common = use("App/Common/common")

const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = use('mongodb'); // or ObjectID 
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class RoleController extends BaseController {
  constructor() {
    super()
    this.Model = new RoleModel()
    this.PermissionModel = new PermissionModel()
    this.UserModel = new UserModel()
  }

  async index({ request, response }) {
    let allowFields = {
      _id: 1,
      name: 1,
      Permission: 1,
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
    for (let i in result.data) {
      let id = result.data[i]._id
      result.data[i].userNumber = await this.UserModel.countUser({ roleId: ObjectId(id) });
    }
    return result
  }

  async detail({ request, response }) {
    let allowFields = {
      _id: 1,
      name: 1,
      permissionIds: 1,
    }
    let result = await super.detail({ request, response, allowFields })
    return result
  }

  async store({ request, response }) {
    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    const allowFields = {
      name: "string!",
      permissionIds: ["objectid!"]
    }
    const data = this.validate(input, allowFields, { removeNotAllow: true })
    for (let permission of data.permissionIds) {
      let notExist = await this.PermissionModel.getById(ObjectId(permission))
      if (!notExist) throw new ApiException(404, "Permission_Not_Exist")
    }
    let existName = await this.Model.getOne({
      name: data.name
    })
    if (existName) throw new ApiException(400, "Role_Name_Exist")
    //insert to database
    let result = await this.Model.insertOne(data)
    return result
  }

  async update({ request, response }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "Id_Required")

    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(404, "No_Object")

    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    const allowFields = {
      name: "string!",
      permissionIds: ["objectid!"]
    }
    const data = this.validate(input, allowFields, { removeNotAllow: false })
    for (let permission of data.permissionIds) {
      let notExist = await this.PermissionModel.getById(ObjectId(permission))
      if (!notExist) throw new ApiException(404, "Permission_Not_Exist")
    }
    let existName = await this.Model.getOne({
      name: data.name
    })
    if (existName) {
      if (existName._id != id) {
        throw new ApiException(400, "Role_Name_Exist")
      }
    }

    return await this.Model.update(id, data)
  }

  async delete({ request, response }) {
    let id = request.query.ids
    if (!id) throw new ApiException(422, "Id_Required")
    for (let i of id) {
      let exist = await this.Model.getById(ObjectId(i))
      if (!exist) throw new ApiException(404, "No_Object")
      let cantDelete = await this.UserModel.getOne({ roleId: exist._id })
      if (cantDelete) throw new ApiException(405, "Role_Has_User")
    }
    return await super.delete({ request, response })
  }
}

module.exports = RoleController
