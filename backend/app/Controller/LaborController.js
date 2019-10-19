const BaseController = use("./BaseController")
const LaborModel = use("App/Models/Labor")
const HistoryModel = use("App/Models/History")
const UserModel = use("App/Models/User")
const PositionModel = use("App/Models/Position")
const ConstructionModel = use("App/Models/Construction")
const SetTimeModel = use("App/Models/Setting")
const _ = use('lodash')
const ApiException = use("App/Exceptions/ApiException")
const Common = use("App/Common/common")
const moment = use('moment')
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class LaborController extends BaseController {
  constructor() {
    super()
    this.Model = new LaborModel();
    this.HistoryModel = new HistoryModel();
    this.UserModel = new UserModel();
    this.PositionModel = new PositionModel()
    this.ConstructionModel = new ConstructionModel()
    this.SetTimeModel = new SetTimeModel()
  }

  async index({ request, response }) {
    let allowFields = {
      _id: 1,
      name: 1,
      code: 1,
      // schedules: 1,
      insert: {
        when: 1
      }
    }
    const input = request.query
    //get filter date infor and assign to dateFilter
    let { startDate, endDate } = input
    startDate = Common.string_to_ISO(startDate)
    endDate = Common.string_to_ISO(endDate)
    let result = await this.Model.aggregation().getForGridTable(input, allowFields)

    // calculate total workers and total days
    let constructions = result.data
    for (let index in constructions) {
      let construction = constructions[index]
      //khởi tạo giá trị cho constructions
      construction = {
        ...construction,
        totalTime: 0,
        totalSalary: 0,
        totalWorkers: 0
      }
      //get histories using construction id
      let histories = await this.HistoryModel.getByConstruction(construction._id, {
        startDate: startDate,
        endDate: endDate
      });
      var groupByPeople = _.uniqBy(histories, function (x) {
        return String(x.userId);
      }) || [];
      construction.totalWorkers = groupByPeople.length

      var groupByDate = _.uniq(histories, function (x) {
        return x.date;
      }) || [];
      construction.totalDays = groupByDate.length

      for (let history of histories) {

        //get user infor
        history.user = await this.UserModel.getById(history.userId, {
          name: 1,
          code: 1,
          positionId: 1
        });

        //nếu không tồn tại user thì bỏ qua
        if (!history.user) {
          continue;
        }

        //assign salary to user
        history.user.remuneration = history.remuneration
        //calculate total salary
        construction = this.Model.totalSalary(construction, history)
      }
      constructions[index] = construction
    }
    //lấy trong setting time xem là kiểu giờ 60 hay 10
    const { is60Time } = await this.SetTimeModel.getTimeSetting() || {}
    constructions = constructions.map(construct => {
      //chuyển về string để xuất excel
      return{
        ...construct,
        totalTime: is60Time? Common._60TimeFormat(construct.totalTime) : Common._10TimeFormat(construct.totalTime),
        totalSalary: String(construct.totalSalary).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      };
    })
    result.data = constructions
    return result
  }

  async detail({ request, response }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "ID is required!")
    let input = request.query
    let startDate = input.startDate
    startDate = Common.string_to_ISO(startDate)
    let endDate = input.endDate
    endDate = Common.string_to_ISO(endDate)

    let histories = await this.HistoryModel.getByConstruction(id, {
      startDate, endDate
    });

    let result = {
      histories: histories,
      construction: await this.ConstructionModel.getById(id, { code: 1, name: 1 })
    }

    for (let j in result.histories) {
      let history = result.histories[j]
      //get user infor
      history.user = await this.UserModel.getById(history.userId, {
        name: 1,
        code: 1,
        positionId: 1
      });
      if (!history.user) {
        continue;
      }
      if (!history.checkOutStatus) {
        histories[j] = {
          ...histories[j],
          workingHourPerDay: null,
          salaryPerDay: null
        }
        continue;
      }

      //assign salary to user
      history.user.remuneration = history.remuneration

      //calculate total salary
      result.histories[j] = this.Model.detailSalary(history, id) || {}
      result.histories[j].date = moment(history.date).format('YYYY/MM/DD')
      delete result.histories[j].constructions
    }

    result.data = result.histories
    delete result.histories
    //gán tổng cuối cùng vào
    let total = {
      totalRow: true,
      ignoreIndex: true, 
      workingHourPerDay: 0,
      salaryPerDay: 0
    }
    result.data.map(item => {
      total.workingHourPerDay += item.workingHourPerDay || 0;
      total.salaryPerDay += item.salaryPerDay || 0
    })

    //lấy trong setting time xem là kiểu giờ 60 hay 10
    const { is60Time } = await this.SetTimeModel.getTimeSetting() || {}
    
    result.data.push(total)
    result.data = result.data.map(data => {
      let salary = data.salaryPerDay || 0
      return{
        ...data,
        workingHourPerDay: is60Time? Common._60TimeFormat(data.workingHourPerDay) : Common._10TimeFormat(data.workingHourPerDay),
        salaryPerDay: String(salary).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      }
    })
    return result
  }

  async destroy({ request, response }) {
    return await super.destroy({ request, response })
  }
}

module.exports = LaborController
