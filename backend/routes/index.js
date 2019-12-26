const Route = use('Route')
const AuthMiddleware = use("App/Middleware/AuthMiddleware")
const ExtendedResponseMiddleware = use("App/Middleware/ExtendedResponseMiddleware")

Route.group(() => {
    Route.post("/users/admin", "UserController.login")
    Route.group(() => {
        Route.get("/goods/getBadByType", "GoodsController.getBadByType")
        Route.get("/goods/getTypeGoods", "GoodsController.getTypeGoods")
        Route.put("/users/editpassword/:id", "UserController.editPassword")
        Route.put("/users/updateLineToken", "UserController.updateLineToken")

        Route.resource("/users", "UserController")
        Route.resource("/bads", "BadController")
        Route.resource("/goods", "GoodsController")
        Route.resource("/order", "OrderController")
        Route.resource("/finance", "FinanceController")
        Route.resource("/client", "ClientController")
        Route.resource("/posts", "PostsController")
        Route.resource('/positions', 'PositionController')
        Route.resource('/contact', 'ContactController')
    }).middleware([AuthMiddleware])
}).prefix("/api/v1").middleware([ExtendedResponseMiddleware])