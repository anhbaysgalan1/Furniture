const BaseMiddleware = use("./BaseMiddleware")
const Auth = use("Auth")
class PermissionMiddleware extends BaseMiddleware {
  constructor(request, response, next) {
    super(request, response, next)
    let token = request.headers.authorization || ""
    this.checkManeger(token)
  }

  async checkManeger(jwtToken) {
    let token = jwtToken.split(" ")
    let [error, result] = await to(Auth.verify(token[1]))
    let { permissions } = result
    this.request.permissions = {}
    permissions.map(permit => {
        this.request.permissions[permit] = true
    })
    this.next();
  }

}

module.exports = PermissionMiddleware.export()
