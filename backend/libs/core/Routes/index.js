//const Group = require("./group")
const Route = require("./route")
class Group {
  constructor() {
    this.router = require('express').Router(); //chắc chắn mỗi group khởi tạo 1 đối tượng router mới
    this._groups = [] //danh sách cá nhóm con của Group
    this._name = null //tên group
    this._register = null //hàm callback
    this._routes = [] //danh sách các route của group
    this._prefix = "/" //prefix
    this.middlewares = [] //mảng middleware của group

  }
  //tạo điểm checkpoint để dánh dấu đang tạo route cho group nào.
  getPoint() {
    return Group.pointToObject || this
  }
  /**
   *
   * đăng ký hàm callback cho group.
   */
  setRegister(register) {
    this._register = register
  }

  build() {
    if (typeof this._register === "function") {
      //cho các group
      this._register()
    } else {
      //cho hàm build gốc
      const userRoute = use("routes")
    }
    //gán middleware
    if(this.middlewares.length > 0) this.router.use(...this.middlewares)
    //gán các router trực tiếp của group
    this._routes.map(route => {
      this.router.use(route.build())
    })
    //truy vấn router của các group nhỏ hơn
    this._groups.map(group => {
      Group.pointToObject = group
      this.router.use(group.getPrefix(), group.build())
    })

    return this.router
  }

  /** group method */
  group(register) {
    const group = new Group()
    group.setRegister(register)
    this.getPoint()._groups.push(group)
    return group
  }
  getPrefix() {
    return this._prefix
  }
  /**
   * Route.group(() => {...}).prefix("/url/to/api")
   */
  prefix(path) {
    this._prefix = path
    return this
  }

  /**
   * Route.group(() => {...}).middleware([middleware1,middleware2])
   */
  middleware(middlewares) {
    this.middlewares = [
      ...this.middlewares,
      ...middlewares
    ]
    return this
  }

  //route method
  addMethod(url, action, method) {
    //console.log(`add route: [${method}] ${url} ${action}`)
    const route = new Route(url, action, method)
    this.getPoint()._routes.push(route)
    return route
  }
  get(url, action) {
    return this.addMethod(url, action, "get")
  }
  post(url, action) {
    return this.addMethod(url, action, "post")
  }
  put(url, action) {
    return this.addMethod(url, action, "put")
  }
  delete(url, action) {
    return this.addMethod(url, action, "delete")
  }
  resource(url,controller){
    return this.group(() => {
      let Route = use('Route')
      Route.get("/", `${controller}.index`)
      Route.post("/", `${controller}.store`)
      Route.get("/:id",`${controller}.detail`)
      Route.put("/:id",`${controller}.update`)
      Route.delete("/:id",`${controller}.destroy`)
      Route.delete("/",`${controller}.delete`)
    }).prefix(url)
  }

}

module.exports = Group