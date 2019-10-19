const BaseController = use("./BaseController")
const HistoryModel = use("App/Models/History")
const ConstructionModel = use("App/Models/Construction")
const RequestModel = use("App/Models/Request")
const DayOffModel = use("App/Models/DayOff")
const UserModel = use('App/Models/User')
const SettingModel = use('App/Models/Setting')
const moment = use('moment')
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = require('mongodb')
const _ = use('lodash')
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class CalendarController extends BaseController {
   constructor() {
      super()
      this.HistoryModel = new HistoryModel()
      this.ConstructionModel = new ConstructionModel()
      this.RequestModel = new RequestModel()
      this.DayOffModel = new DayOffModel()
      this.UserModel = new UserModel()
      this.SettingModel = new SettingModel()
   }

   async index({ request, response }) {
      let allowFields = {
         date: 1,
         startTime: 1,
         endTime: 1,
         constructions: 1
      }
   }

   async listConstruction({ request, response }) {
      let input = request.query
      input._id = request.query.userId || Auth.user._id
      let users = await this.UserModel.getAllUsers()
      const allowFields = {
         _id: "objectid!"
      }
      const data = this.validate(input, allowFields, { removeNotAllow: true })
      let list = await this.ConstructionModel.getAllDayByUserId(ObjectId(data._id))
      return {
         list: list,
         users: users
      }
   }

   async detailPast({ request, response }) {
      //data request len (user ID dang login + date request)
      let data = {
         _id: Auth.user._id
      }
      let userId = _.get(request, "query.userId", "")
      if (userId) {
         data = {
            _id: userId
         }
      }
      //danh sach cong truong trong history
      let list = await this.HistoryModel.getInfo(data)
      // danh sach ID cong truong của user theo date
      let construction = {}
      for (let element of list) {
         for (let item of element.constructions) {
            construction = await this.ConstructionModel.getOne({ _id: item.constructionId }, {
               name: 1, code: 1, address: 1
            })
            if (construction) {
               item['name'] = construction.name
               item['code'] = construction.code
               item['address'] = construction.address
            }
         }
      }
      return list
   }

   async listConstructionCalendar({ request, response }) {
      let users = await this.UserModel.getAllUsers()
      let input = request.query
      input._id = request.query.userId || Auth.user._id
      input.yearMonth = request.query.yearMonth || moment().format('YYYY-MM')
      const allowFields = {
         _id: "objectid!",
         yearMonth: "string"
      }
      const data = this.validate(input, allowFields, { removeNotAllow: true })
      let list = await this.ConstructionModel.getConstructionInCalendar(ObjectId(data._id), data.yearMonth)
      return {
         list: list,
         users: users
      }
   }

   async listHistoryCalendar({ request, response }) {
      let input = request.query
      input._id = request.query.userId || Auth.user._id
      input.yearMonth = request.query.yearMonth || moment().format('YYYY-MM')

      //danh sach cong truong trong history
      let list = await this.HistoryModel.getHistoryInCalendar(input._id, input.yearMonth)
      // danh sach ID cong truong của user theo date
      let construction = {}
      for (let element of list) {
         for (let item of element.constructions) {
            construction = await this.ConstructionModel.getOne({ _id: item.constructionId }, {
               name: 1, code: 1, address: 1
            })
            if (construction) {
               item['name'] = construction.name
               item['code'] = construction.code
               item['address'] = construction.address
            }
         }
      }
      return list
   }

   async listWorkerRequestsCalendar({ request, response }) {
      let input = request.query
      input._id = request.query.userId || Auth.user._id
      input.yearMonth = request.query.yearMonth || moment().format('YYYY-MM')
      let result = await this.RequestModel.getRequestInCalendar(input._id, input.yearMonth);

      let dayoffsInMonth = await this.DayOffModel.getDayOffCalendar(input._id, input.yearMonth);
      dayoffsInMonth = dayoffsInMonth.map(item => item.date)

      for (let request of result) {
         if (Array.isArray(request.data)) {
            for (let contruction of request.data) {
               let getConstructionInfo = await this.ConstructionModel.getOne({ _id: ObjectId(contruction.constructionId) }, { code: 1, name: 1 })
               if (getConstructionInfo) {
                  contruction['name'] = getConstructionInfo.name
                  contruction['code'] = getConstructionInfo.code
               }
            }
         }
         //check xem admin có xóa ngày xin phép những đơn xin phép đã đồng ý không
         if (request.status == true) {
            if (request.type == 6 && !dayoffsInMonth.includes(request.replaceDate)) {
               request.deletedByAdmin = true
            }
            if ((request.type == 3 || request.type == 5) && !dayoffsInMonth.includes(request.date)) {
               request.deletedByAdmin = true
            }
         }
      }
      return result
   }

   async listUserDayOffCalendar({ request, response }) {
      let input = request.query
      input._id = request.query.userId || Auth.user._id
      input.yearMonth = request.query.yearMonth || moment().format('YYYY-MM')
      let result = await this.DayOffModel.getDayOffCalendar(input._id, input.yearMonth)
      return result
   }

   async listHolidayCalendar({ request, response }) {
      let allowFields = {
         key: 1,
         data: {
            date: 1,
            type: 1
         },
         holidayInProvision: 1,
         holidayOutProvision: 1
      }
      let list = await this.SettingModel.aggregation().getForGridTable(request.query, allowFields)
      return list
   }
}

module.exports = CalendarController
