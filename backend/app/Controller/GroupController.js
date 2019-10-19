const BaseController = use("./BaseController")
const GroupModel = use("App/Models/Group")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class GroupController extends BaseController{
  constructor(){
    super()
    this.Model = new GroupModel()
  }

  async index({request, response}){
    let allowFields = {
      _id: 1,
      name: 1,
      code: 1,
      insert: {
        when: 1
      }
    }
    return await this.Model.aggregation().getForGridTable(request.query, allowFields)
  }

  async detail({request, response}){
    let allowFields = {
      _id: 1,
      name: 1,
      code: 1
    }
    return await super.detail({request, response, allowFields})
  }

  async store({request, response}){
    //allowFields là object các trường được phép lưu vào db
    let allowFields = {
      _id: 1
    }

    return await super.store({request, response, allowFields})
  }

  async update({request, response}){
    //allowFields là object các trường được phép lưu vào db
    let allowFields = {
      _id: 1
    }
    return await super.update({request, response, allowFields})
  }

  async destroy({request, response}){
    return []
    return await super.destroy({request, response})
  }

  async delete({request, response}){
    return await super.delete({request, response})
  }
}

module.exports = GroupController
