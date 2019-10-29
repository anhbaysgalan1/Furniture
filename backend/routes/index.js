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
        Route.post("/workers/checkout", "WorkerController.checkOut")
        Route.get("/workers/initCheckTime", "WorkerController.initCheckTime")
        Route.get("/requests/getApprover", "RequestController.getApprover")
        Route.get("/requests/checkExistRequest", "RequestController.checkExistRequest")
        Route.get("/requests/countDayOffRequest", "RequestController.countDayOffRequest")

        // Route.get("/settings/getTimeList","SettingController.getTimeList")
        Route.get("/users/getTimeList", "UserController.getTimeList")

        Route.post("/workers/checkin", "WorkerController.checkIn")
        Route.get("/calendars/detailPast", "CalendarController.detailPast")
        Route.get("/calendars/listConstruction", "CalendarController.listConstruction")
        Route.get("/calendars/listConstructionCalendar", "CalendarController.listConstructionCalendar")
        Route.get("/calendars/listHistoryCalendar", "CalendarController.listHistoryCalendar")
        Route.get("/calendars/listWorkerRequestsCalendar", "CalendarController.listWorkerRequestsCalendar")
        Route.get("/calendars/listUserDayOffCalendar", "CalendarController.listUserDayOffCalendar")
        Route.get("/calendars/listHolidayCalendar", "CalendarController.listHolidayCalendar")
        Route.put('/constructions/deleteEmployee', 'ConstructionController.deleteEmployee')
        Route.put('/constructions/overRide', 'ConstructionController.overRide')
        Route.get('/constructions/listCheckIn', 'ConstructionController.listCheckIn')

        Route.get('/constructions/getListUser', 'ConstructionController.getListUser')
        Route.get('/constructions/getByUserIdAndDate', 'ConstructionController.getByUserIdAndDate')
        Route.get("/constructions/listHolidayContruction", "ConstructionController.listHolidayContruction")

        Route.get('/reports/getByUserIdAndDate', 'ReportController.getByUserIdAndDate')
        Route.get("/reports/listConstruction", "ReportController.listConstruction")

        Route.put("/users/editpassword/:id", "UserController.editPassword")
        Route.put("/users/updateLineToken", "UserController.updateLineToken")
        Route.put("/requests/sendMessage", "RequestController.sendMessage")
        Route.get("/timekeepings/distanceFuelIndex", "TimekeepingController.distanceFuelIndex")
        Route.get("/requests/getListMessages", "RequestController.getListMessages")
        Route.put("/requests/reUpdate", "RequestController.reUpdate")

        Route.resource("/users", "UserController")

        // Route.resource("/bads", "BadController")

        Route.resource('/groups', 'GroupController')
        Route.resource('/areas', 'AreaController')
        Route.resource('/roles', 'RoleController')
        Route.resource('/permissions', 'PermissionController')
        Route.resource('/positions', 'PositionController')
        Route.resource('/settings', 'SettingController')
        Route.resource('/dayoffs', 'DayOffController')
        Route.resource('/reports', 'ReportController')
        Route.resource('/constructions', 'ConstructionController')
        Route.resource('/labors', 'LaborController')
        Route.resource('/histories', 'HistoryController')
        Route.resource('/workers', 'WorkerController')
        Route.resource('/requests', 'RequestController')
        Route.resource('/hours', 'HourController')
        Route.resource('/calendars', 'CalendarController')
        Route.resource('/timekeepings', 'TimekeepingController')
        Route.resource('/contents', 'ContentsController')

        /*__AUTOROUTE__*/

    }).middleware([AuthMiddleware, PermissionMiddleware, checkManagerMiddleware])
}).prefix("/api/v1").middleware([ExtendedResponseMiddleware])