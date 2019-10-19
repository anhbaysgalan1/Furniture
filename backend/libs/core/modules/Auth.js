const jwt = use("jsonwebtoken")
const authConfig = use("config/auth")
const ObjectId = use("Database/ObjectId")
const UserModel = use('App/Models/User')
const RoleModel = use('App/Models/Role')
const PermissionModel = use('App/Models/Permission')
const _ = use('lodash')
class Auth {
  static generateJWT(data){
    return jwt.sign(data, authConfig.SECRET_KEY, authConfig.jwt_options)
  }
  static async verify(token){
    let userModel = new UserModel()
    let result = await jwt.verify(token, authConfig.SECRET_KEY, authConfig.jwt_options)
    result._id = ObjectId(result._id)
    let user = await userModel.getById(result._id)
    if (user) {
      let serverPermissions = await this._getServerPermissionOfUser(user.roleId)
      let hasChangePermission = this._checkChangePermissions(result.permissions, serverPermissions) 
      if (hasChangePermission) {
        let error = new Error('Token invalid or experted')
        error.name = "invalidToken"
        throw error
      } else {
        Auth.user = result
        return result
      }
    } else {
      throw new Error('User Not Found!')
    }
    Auth.user = result
    return result
  }

  static async _getServerPermissionOfUser (roleId) {
    let roleModel = new RoleModel()
    let permissionModel = new PermissionModel()
    let { permissionIds } = await roleModel.getById(roleId, {_id: 1, permissionIds: 1})
    let permissions = []
    for (let permissionId of permissionIds) {
      let { key } = await permissionModel.getById(permissionId, { key: 1 })
      permissions.push(key)
    }
    return permissions
  }

  static _checkChangePermissions (clientPermissions, serverPermissions) {
    let hasChange = false
    for (let clientPer of clientPermissions) {
      if (!serverPermissions.includes(clientPer)) {
        hasChange = true
      }
    }
    for (let serverPer of serverPermissions) {
      if (!clientPermissions.includes(serverPer)) {
        hasChange = true
      }
    }
  
    return hasChange
  }
}

module.exports = (pathFile) => {
  return Auth
}
