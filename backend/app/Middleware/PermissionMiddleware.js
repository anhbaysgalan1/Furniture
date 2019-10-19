const BaseMiddleware = use("./BaseMiddleware")
const { permits } = use("config/permissions")
var url = require('url');
const Auth = use("Auth")

class PermissionMiddleware extends BaseMiddleware {
  constructor(request, response, next) {
    super(request, response, next)

    let token = request.headers.authorization || ""

    let url_parts = url.parse(request.url);

    const request_method = request.method
    const path = url_parts.pathname
    this.checkRole(token, path, request_method)
  }

  async checkRole(jwtToken, Path, request_method) {
    const _request_method = request_method
    this.isPassed = false
    let token = jwtToken.split(" ")
    let [error, result = {}] = await to(Auth.verify(token[1]))
    let { permissions } = result

    Object.keys(permits).map(permit => {
      //check permissions
      if (permissions.includes(permit)) {
        permits[permit].map(api => {
          //check resource
          if (Path.includes(api.resources)) {
            //check method
            if (api.methods.includes(_request_method)) {
              this.isPassed = true
            }
          }
        })
      }
    })

    const ApiAlwayPass = ['/users/updateLineToken']
    if (ApiAlwayPass.includes(Path)) {
      this.next()
    } else {
      if (this.isPassed) {
        this.next();
      } else {
        return this.response.error(403, 'can not access')
      }
    }

  }

}

module.exports = PermissionMiddleware.export()
