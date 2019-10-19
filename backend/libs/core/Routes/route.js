let controllers = {}
const Exception = use("Exception")
class Route {
  constructor(url, action, method) {
    this.router = require('express').Router();
    this.url = url
    this.action = action
    this.method = method
    this.middlewares = []
  }
  //Route.get().middleware([mid1, mid2....])
  middleware(middlewares) {
    this.middlewares = [
      ...this.middlewares,
      ...middlewares
    ]
    return this
  }
  /**
   * Convert ActionPath sang function
   * UserController.index ==> function index trong UserController.
   */
  getActionFromPath(actionPath) {
    let [controllerName, actionName] = actionPath.split(".")
    if (controllerName == undefined || actionName == undefined) {
      throw new Error(`Action does not exist: ${actionPath}`)
    }
    try {
      if (!controllers[controllerName]) {
        const controllerInstance = use(`App/Controller/${controllerName}`)
        controllers[controllerName] = new controllerInstance()
      }

      let controller = controllers[controllerName]

      if (typeof controller[actionName] !== "function") {
        throw new Error(`Action does not exist: ${actionPath}`)
      }

      return controller[actionName].bind(controller)
    } catch (error) {
      throw error
    }
  }

  /**
   * Hàm tạo ra các router
   */
  build() {
    let action = this.action
    if (typeof action !== "function") action = this.getActionFromPath(action)
    this.router[this.method](this.url,
      ...this.middlewares,
      async (request, response, next) => {
        try{
          let result = await action({
            request,
            response,
            next
          })
          if(result) response.success(result)
          response.end()
        }
        catch(e){
          //console.log(e)
          Exception.handle(e, request, response)
        }
      }
    )
    return this.router
  }
}

module.exports = Route
