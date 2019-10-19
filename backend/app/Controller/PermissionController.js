const BaseController = use("./BaseController")
const PermissionModel = use("App/Models/Permission")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class PermissionController extends BaseController{
  constructor(){
    super()
    this.Model = new PermissionModel()
  }

  async index({request, response}){
    request.query.pageSize = -1
    let allowFields = {
      _id: 1,
      name: 1,
      insert:{
        when: 1
      }
    }
    return await this.Model.aggregation().getForGridTable(request.query, allowFields)
  }

  // async detail({request, response}){
  //   let allowFields = {
  //     _id: 1,
  //     name: 1
  //   }
  //   return await super.detail({request, response, allowFields})
  // }

  // async store({request, response}){
  //   //allowFields là object các trường được phép lưu vào db
  //   let allowFields = {
  //     _id: 1
  //   }

  //   return await super.store({request, response, allowFields})
  // }

  // async update({request, response}){
  //   //allowFields là object các trường được phép lưu vào db
  //   let allowFields = {
  //     _id: 1
  //   }
  //   return await super.update({request, response, allowFields})
  // }

  // async destroy({request, response}){
  //   return await super.destroy({request, response})
  // }
}

module.exports = PermissionController
