const BaseModel = use("./BaseModel")
const { ObjectId } = require("mongodb")
class Role extends BaseModel {
  constructor() {
    super()
  }
  static get collectionName() {
    return "roles"
  }
  static get relationship() {
    return {
      Permission: {
        relationType: "hasMany",
        model: "App/Models/Permission",
        localField: "permissionIds",
        foreignField: "_id",
      }
    }
  }
  async getRoleByPermissions(permissionId) {
    // if(!Array.isArray(permissionIds)){
    //   throw 'need array'
    // }
    let [error, result] = await to(this.collection.find({permissionIds: ObjectId(permissionId)}, {password: 0}).toArray())
    if (error) throw new DatabaseException(error)
    return result
  }
}

module.exports = Role
