const BaseController = use("./BaseController")
const ConstructionModel = use("App/Models/Construction")
const DayOffModel = use("App/Models/DayOff")
const UserModel = use("App/Models/User")
const SettingModel = use('App/Models/Setting')
const HistoryModel = use('App/Models/History')
const Auth = use("Auth")
const moment = use("moment")
const ApiException = use("App/Exceptions/ApiException")
const Common = use("App/Common/common")
const { ObjectId } = require('mongodb')

/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class ConstructionController extends BaseController {
  constructor() {
    super()
    this.Model = new ConstructionModel()
    this.DayOffModel = new DayOffModel()
    this.UserModel = new UserModel()
    this.SettingModel = new SettingModel()
    this.HistoryModel = new HistoryModel()
  }
  async index({ request, response }) {
    const { mana_construction, sort_user, profit } = request.permissions

    let allowFields = {
      _id: 1,
      code: 1,
      name: 1,
      insert: {
        when: 1
      }
    }
    if (profit) {
      allowFields = {
        ...allowFields,
        cost: 1,
        amount: 1,
        contructionProfit: 1
      }
    }
    //nếu có 3 quyền này thì thêm thông tin
    if (mana_construction || sort_user || profit) {
      allowFields = {
        ...allowFields,
        dateStart: 1,
        dateEnd: 1,
        address: 1,
      }
    }

    let result = await this.Model.aggregation([
      {
        $sort:
        {
          _id: -1
        }
      }
    ]).getForGridTable(request.query, allowFields)
    return result
  }

  async detail({ request, response }) {
    const { sort_user, profit } = request.permissions
    let allowFields = {
      _id: 1,
      code: 1,
      name: 1,
      dateStart: 1,
      dateEnd: 1,
      address: 1,
      workNight: 1,
      content: 1
    }
    if (profit) {
      allowFields['amount'] = 1
      allowFields['cost'] = 1
      allowFields['profit'] = 1
    }
    if (sort_user) {
      allowFields['schedules'] = 1
    }

    return await super.detail({ request, response, allowFields })
  }

  // tính tỉ lệ lợi nhuận
  async calculateProfit(cost, amount) {
    let calculateProfit
    let profit
    calculateProfit = ((amount - cost) / amount) * 100
    if (isNaN(calculateProfit) || !isFinite(calculateProfit) || calculateProfit === undefined) {
      profit = 0
    }
    else {
      profit = Math.trunc(calculateProfit * 100) / 100
    }
    return profit
  }

  async store({ request, response }) {
    const { mana_construction, profit } = request.permissions
    if (mana_construction === undefined) {
      throw new ApiException(403, "No_Add_Permission")
    }
    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    let allowFields = {
      _id: "objectid",
      code: "string!",
      name: "string!",
      dateStart: "date",
      dateEnd: "date",
      address: "string",
      content: 'string'
    }
    if (profit) {
      allowFields = {
        ...allowFields,
        contructionProfit: "number",
        cost: "number",
        amount: "number"
      }
      input.contructionProfit = await this.calculateProfit(input.cost, input.amount)
    }
    let data = this.validate(input, allowFields, { removeNotAllow: true })
    if (!data.cost) {
      data.cost = ''
    }
    if (!data.amount) {
      data.amount = ''
    }
    //trả về rỗng trường date nếu input không có
    if (!input.dateStart) data.dateStart = null
    if (!input.dateEnd) data.dateEnd = null
    let exist = await this.Model.getOne({ code: data.code })
    if (exist) throw new ApiException(400, "Construction_Code_Exist")
    let result = await this.Model.insertOne(data)
    return result
  }

  async overRide({ request, response }) {
    let input = request.body
    let allowFieldsPerConstruction = {
      code: "string!",
      name: "string!",
      address: "string",
      amount: "number",
      cost: "number",
      dateStart: "date",
      dateEnd: "date",
      contructionProfit: "number"
    }

    let allowFields = {
      constructions: [
        allowFieldsPerConstruction
      ]
    }

    let data = this.validate(input, allowFields, { removeNotAllow: true })
    let count_update = 0
    let count_create = 0
    for (let construction of data.constructions) {
      let contructionProfit = await this.calculateProfit(construction.cost, construction.amount)
      construction['contructionProfit'] = contructionProfit
      if (!construction.amount) {
        construction.amount = ''
      }
      if (!construction.cost) {
        construction.cost = ''
      }
      if (!construction.dateStart) {
        construction.dateStart = null
      }
      if (!construction.dateEnd) {
        construction.dateEnd = null
      }
      let exist = await this.Model.getOne({ code: construction.code })
      if (exist) {
        count_update++
        await this.Model.updateByCondition({ code: construction.code }, construction)
      } else {
        count_create++
        await this.Model.insertOne(construction)
      }
    }

    return {
      count_update: count_update,
      count_create: count_create
    }
  }

  async getByUserIdAndDate({ request, response }) {
    let { profit } = request.permissions
    let dataShow = {
      code: 1,
      name: 1,
      address: 1,
      content: 1,
      listManager: 1
    }
    if (profit) {
      dataShow = {
        ...dataShow,
        cost: 1,
        amount: 1,
        contructionProfit: 1
      }
    }
    let input = request.query
    let allowFields = {
      date: "string!",
      userId: "objectid!"
    }
    let data = this.validate(input, allowFields, { removeNotAllow: true })
    let result = await this.Model.listConstructionByUserId(data.userId, data.date, dataShow)
    return result
  }

  //Lấy ra list user để xếp lịch làm việc
  async getListUser({ request, response }) {
    let allowFields = {
      _id: 1,
      userId: 1,
      listUser: 1,
      date: 1
    }
    let list = await this.DayOffModel.aggregation([
      {
        $addFields: {
          requestMonth: {
            $substr: [
              "$date", 0, 7
            ]
          }
        }
      },
      {
        $match: {
          requestMonth: request.query.date
        }
      },
      {
        $group: {
          "_id": "$date",
          "listUser": { "$push": "$userId" }
        }
      }
    ]).getForGridTable(request.query, allowFields)
    return list
  }

  async listHolidayContruction({ request, response }) {
    let allowFields = {
      key: 1,
      data: {
        date: 1,
        type: 1,
        title: 1,
        start: 1,
      },
      holidayInProvision: 1,
      holidayOutProvision: 1
    }
    let list = await this.SettingModel.aggregation().getForGridTable(request.query, allowFields)
    return list
  }

  async update({ request, response }) {
    const { sort_user, profit } = request.permissions
    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    let allowFields = {
      _id: "objectid",
      code: "string!",
      name: "string!",
      dateStart: "date",
      dateEnd: "date",
      address: "string",
      workNight: "boolean",
      content: 'string'
    }
    if (profit) {
      allowFields = {
        ...allowFields,
        contructionProfit: "number",
        cost: "number",
        amount: "number"
      }
      input.contructionProfit = await this.calculateProfit(input.cost, input.amount)
    }
    let schedules = input.schedules
    if (sort_user && Array.isArray(schedules)) {
      if (schedules.length !== 0) {
        //ép dữ liệu string dạng YYYY-MM-DD
        schedules.map((item, index) => {
          schedules[index].start = Common.checkFormatDate(item.start)
        })
        allowFields = {
          ...allowFields,
          schedules: [{
            start: "string!", end: "date!", id: "string", title: "string",
            employees: [{ value: "objectid", label: "string" }],
            manage: [{ value: "objectid", label: "string" }],
          }]
        }
      }
    }

    let data = this.validate(input, allowFields, { removeNotAllow: true })
    if (Array.isArray(data.schedules)) {
      data.schedules.map(item => {
        if (!Array.isArray(item.employees)) item.employees = []
        if (!Array.isArray(item.manage)) item.manage = []
      })
    }
    if (!data.cost) {
      data.cost = ''
    }
    if (!data.amount) {
      data.amount = ''
    }
    //trả về rỗng trường date nếu input không có
    if (!input.dateStart) data.dateStart = null
    if (!input.dateEnd) data.dateEnd = null
    if (Array.isArray(schedules) && schedules.length === 0 && sort_user) {
      data = {
        ...data,
        schedules: []
      }
    }
    let exist = await this.Model.getOne({ code: data.code })
    if (exist) {
      if (exist._id != input._id) {
        throw new ApiException(400, "Construction_Code_Exist")
      }
    }
    let result = await this.Model.update(input._id, data)
    return result
  }

  async delete({ request, response }) {
    const { mana_construction } = request.permissions
    if (mana_construction === undefined) {
      throw new ApiException(403, "No_Del_Permission")
    }
    let id = request.query.ids
    if (!id) throw new ApiException(422, "Id_Required")
    for (let i of id) {
      let exist = await this.Model.getById(ObjectId(i))
      if (!exist) throw new ApiException(404, "No_Object")
      if (Array.isArray(exist.schedules)) {
        if (exist.schedules.length > 0) throw new ApiException(405, "Del_Construction_Warn")
      }
    }
    return await super.delete({ request, response })
  }

  async isDeleted(request, response) {
    //  let id = request.params.id
    //  return await this.Model.update(ObjectId(id), {
    //   '$set ': { isDeleted: true }
    // })
  }
  async listCheckIn({ request, response }) {
    let listCheckIn = await this.HistoryModel.aggregation([{
      $match: {
        date: request.query.date
      }
    }]).getForGridTable(request.query, { userId: 1 })
    return listCheckIn
  }

  async deleteEmployee({ request, response }) {
    let input = request.body
    let allowFields = {
      start: "string!", // format YYYY-MM-DD
      userId: "objectid!",
    }
    let data = this.validate(input, allowFields, { removeNotAllow: true })
    let delInConstruction = await this.Model.deleteEmployee(data.start, data.userId)
    let delInHistory = await this.HistoryModel.deleteByRequest(data.userId, data.start)
    return delInConstruction, delInHistory
  }

}

module.exports = ConstructionController
