const jwt = use("jsonwebtoken")
const authConfig = use("config/auth")
const ObjectId = use("Database/ObjectId")
const UserModel = use('App/Models/User')
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
      Auth.user = result
      return result
    } else {
      throw new Error('User Not Found!')
    }
  }
}

module.exports = (pathFile) => {
  return Auth
}
