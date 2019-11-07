const Route = use('Route')
const AuthMiddleware = use("App/Middleware/AuthMiddleware")
const ExtendedResponseMiddleware = use("App/Middleware/ExtendedResponseMiddleware")
const PermissionMiddleware = use("App/Middleware/PermissionMiddleware")
const checkManagerMiddleware = use("App/Middleware/checkManagerMiddleware")
/**
 * Route:
 * Function:
 *    Method: get, post, put, delete, resource
 *    Route.<method>(path, Action).middleware([middleware1, middleware2])
 *    Ex: Route.get("/user", "UserController.index").middleware([auth])
 *    Route.resource("/user", "UserController")
 *
 *    Route.group(() =>{...}).prefix(path).middleware([middleware1, middleware2])
 *    Ex: Route.group(() =>{
 *        Route.get("/user", "UserController.index")
 *        Route.group("/user", "UserController.index")
 *        use("./setting") //load all router in ./setting.js
 *    }).prefix("/api/v1").middleware([auth])
 */

Route.group(() => {
  Route.post("/users/login", "UserController.login")
  Route.group(() => {
    // Route.put("/requests/sendMessage", "RequestController.sendMessage")
    // Route.get("/users/getTimeList", "UserController.getTimeList")
    // Route.put("/users/editpassword/:id", "UserController.editPassword")
    // Route.put("/users/updateLineToken", "UserController.updateLineToken")
    
    Route.resource("/users", "UserController")
    Route.resource("/bads", "BadController")

    Route.resource("/goods", "GoodsController")
    Route.resource("/order", "OrderController")
    Route.resource("/client", "ClientController")

    Route.resource("/posts", "PostsController")

    Route.resource('/groups', 'GroupController')
    Route.resource('/areas', 'AreaController')
    Route.resource('/roles', 'RoleController')
    Route.resource('/permissions', 'PermissionController')
    Route.resource('/positions', 'PositionController')
    Route.resource('/hours', 'HourController')
    Route.resource('/contents', 'ContentsController')

  // }).middleware([AuthMiddleware, PermissionMiddleware, checkManagerMiddleware])
  }).middleware([AuthMiddleware])
}).prefix("/api/v1").middleware([ExtendedResponseMiddleware])
