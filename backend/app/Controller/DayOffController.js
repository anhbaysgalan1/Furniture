const BaseController = use("./BaseController")
const DayOffModel = use("App/Models/DayOff")
const SettingModel = use("App/Models/Setting")
const UserModel = use("App/Models/User")
const HistoryModel = use("App/Models/History")
const RequestModel = use("App/Models/Request")
const ConstructionModel = use("App/Models/Construction")
const moment = use("moment")
const Common = use("App/Common/common")
const { ObjectId } = require('mongodb')
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
const startDay = new Date(moment().utc().startOf('day').toISOString())
let demoDay = new Date(moment('2019-01-01T00:00:00.000').utc().startOf('day').toISOString())
let thisYear = startDay.getFullYear()

class DayOffController extends BaseController {
  constructor() {
    super()
    this.Model = new DayOffModel()
    this.SettingModel = new SettingModel()
    this.UserModel = new UserModel()
    this.HistoryModel = new HistoryModel()
    this.RequestModel = new RequestModel()
    this.ConstructionModel = new ConstructionModel()
  }

  async index({ request, response }) {
    let allowFields = {
      _id: 1,
      name: 1,
      code: 1,
      joiningDate: 1,
      remainThisYear: 1,
      remainLastYear: 1,
      remainTotal: 1,
      remainByWorkingOnDayOff: 1,
      updateDayOff: 1,
      dayOffUsed: 1,
      sixMonth: 1,
      subtractHour: 1,
      dayOffs: {
        _id: 1,
        date: 1,
        type: 1,
        lable: 1,
        isoDate: 1
      }
    }
    //tinh tong so ngay nghi bu
    let checkHistory = await this.HistoryModel.getUserWorkOnDayOff()
    // dem ngay di lam vao ngay nghi
    let listUserWorkingOnDayOff = []
    for (let history of checkHistory) {
      let checkReplaceDayOff = await this.RequestModel.checkReplaceDayOff(history.date, history.userId) // kiem tra ngày đi làm đó có phải là ngày xin đi làm thay thế k
      if (checkReplaceDayOff != 1 && moment(history.date).format("YYYY-MM-DD") < moment().format("YYYY-MM-DD")) { // nếu k phải là ngày thay thế và khi hết ngày đó thì thêm vào ngày nghỉ bù
        listUserWorkingOnDayOff.push(history.userId)
      }
    }
    // dem so lan user di lam vao ngay nghi 
    const count = Object.create({})
    listUserWorkingOnDayOff.forEach(list => {
      count[list] = count[list] ? count[list] + 1 : 1
    })

    let findDayOffByWorking = await this.Model.findDayOffByWorking() // tìm tổng giờ nghỉ bù đã sử dụng
    let remainByWorkingOnDayOff // thời gian nghỉ bù còn lại
    let afterCalculate = []
    for (let [key, values] of Object.entries(count)) { //for biến đếm số giờ nghỉ bù
      for (let isEqual of findDayOffByWorking) {
        if (String(key) === String(isEqual._id)) {  //kiểm tra của thg user nào thì bắt đầu tính toán
          remainByWorkingOnDayOff = (values * 8) - isEqual.totalSubtract
          isEqual = {
            ...isEqual,
            remainByWorkingOnDayOff: remainByWorkingOnDayOff
          }
          afterCalculate.push(isEqual) // mảng sau tính toán giờ nghỉ bù còn lại
        }
      }
    }
    for (let updateWorkingOnDayOff of afterCalculate) {
      await this.UserModel.update(updateWorkingOnDayOff._id, {
        '$set': {
          remainByWorkingOnDayOff: updateWorkingOnDayOff.remainByWorkingOnDayOff
        }
      })
    }
    //Lấy ra danh sách user đến ngày cấp thêm ngày nghỉ
    let getUpdateDayOffUser = await this.UserModel.getUpdateDayOffUser(moment(startDay).format("MM-DD"), {
      _id: 1,
      joiningDate: 1,
      remainThisYear: 1,
      remainLastYear: 1,
      remainTotal: 1,
      updateDayOff: 1,
    })

    for (let updateUser of getUpdateDayOffUser) {
      var totalRemain = updateUser.remainTotal
      var DayOffThisYear = updateUser.remainThisYear
      var DayOffLastYear = updateUser.remainLastYear
      var updateDayOff = updateUser.updateDayOff
      let isSixMonth = moment(startDay).diff(moment(updateUser.joiningDate).utc().startOf('day').toISOString(), "months")

      if (updateDayOff == null || moment(updateDayOff).format('YYYY') != thisYear.toString()) {
        // 6 tháng đầu
        if (isSixMonth < 18) {
          let countSchedules = await this.ConstructionModel.countUserSchedules(updateUser._id, updateUser.joiningDate)
          let countHistory = await this.HistoryModel.countUserHistory(updateUser._id, updateUser.joiningDate)

          let schedulesDay
          countSchedules.length > 0 ? schedulesDay = countSchedules.pop().schedules_day : schedulesDay = 0
          let workedDay
          countHistory.length > 0 ? workedDay = countHistory.pop().worked_day : workedDay = 0
          let checkUser
          schedulesDay != 0 ? checkUser = (workedDay / schedulesDay) * 100 : checkUser = 0

          if (checkUser >= 80) {
            DayOffThisYear = 10
            DayOffLastYear = 0
          } else {
            DayOffThisYear = 0
            DayOffLastYear = 0
          }

        } else {
          // 1 năm 6 tháng trở lên
          DayOffThisYear = await this.Model.getDayOffThisYear(startDay, updateUser.joiningDate)
          DayOffLastYear = totalRemain - DayOffLastYear // loai bo ngay nghi cua nam kia
        }
      }
      updateDayOff = moment(startDay).format('YYYY-MM-DD') // update ngay cap ngay nghi vao user
      totalRemain = DayOffThisYear + DayOffLastYear

      await this.UserModel.update(updateUser._id, {
        '$set': {
          remainThisYear: DayOffThisYear,
          remainLastYear: DayOffLastYear,
          remainTotal: totalRemain,
          updateDayOff: updateDayOff
        }
      })
    }

    let listUser = await this.UserModel.aggregation([
      {
        $lookup: {
          from: "day_offs",
          localField: "_id",
          foreignField: "userId",
          as: "dayOffs"
        }
      },
      {
        $project: {
          ...allowFields,
          dayOffs: {
            $filter: {
              input: "$dayOffs",
              as: "futureDate",
              cond: {
                $and:
                  [
                    { $gte: ['$$futureDate.isoDate', startDay] },
                    { $ne: ['$$futureDate.type', "6"] }
                  ]
              }
            }
          },
          dayOffUsed: {
            $size: {
              $filter: {
                input: "$dayOffs",
                as: "countDayOff",
                cond: {
                  $and:
                    [
                      { $lt: ['$$countDayOff.isoDate', startDay] },
                      { $eq: ['$$countDayOff.type', "3"] }
                    ]
                }
              }
            }
          }
        }
      }
    ]).getForGridTable(request.query, allowFields)

    return listUser
  }

  async detail({ request, response }) {
    let allowFields = {
      _id: 1,
      userId: 1,
      name: 1,
      joiningDate: 1,
      remainThisYear: 1,
      dayOffs: 1,
      dayOffUsed: 1
    }

    let detailUser = await this.UserModel.getOne(ObjectId(request.params.id), allowFields)
    return detailUser
  }

  async store({ request, response }) {
    let { mana_holiday, allow_level_1, allow_level_2 } = request.permissions
    if (mana_holiday === undefined && allow_level_1 === undefined && allow_level_2 === undefined) {
      throw new ApiException(403, "No_Add_Permission")
    }
    let input = request.body

    let allowFields = {
      _id: "objectid",
      userId: "objectid!",
      date: "string",
      type: "string!",
      lable: "string",
      isoDate: "date",
      subtractHour: "number"
    }

    input._id = new ObjectId()
    Common.checkFormatDate(input.date)
    input.isoDate = Common.string_to_ISO(input.date)
    const data = this.validate(input, allowFields, { removeNotAllow: true })

    let exist = true
    exist = await this.Model.checkValidateDay(data.date, data.userId)
    if (exist) {
      throw new ApiException(400, "DayOff_Exist")
    }

    let user = await this.UserModel.getOne({ _id: data.userId }, { remainLastYear: 1, remainThisYear: 1, remainTotal: 1, remainByWorkingOnDayOff: 1 })

    switch (data.type) {
      case "3":
        if (user.remainTotal <= 0) throw new ApiException(400, "Out_Of_DayOff")
        data.lable = "Nghỉ có lương"
        let subtractLastYear = user.remainLastYear
        let subtractThisYear = user.remainThisYear
        if (user.remainLastYear > 0) {
          subtractLastYear = subtractLastYear - 1
          let remainTotal = user.remainThisYear + subtractLastYear
          await this.UserModel.update(user._id, {
            '$set': {
              remainLastYear: subtractLastYear,
              remainTotal: remainTotal
            }
          })
        } else {
          subtractThisYear = subtractThisYear - 1
          await this.UserModel.update(user._id, {
            '$set': {
              remainThisYear: subtractThisYear,
              remainTotal: subtractThisYear
            }
          })
        }
        break;
      case "5":
        if (user.remainByWorkingOnDayOff < input.subtractHour) throw new ApiException(400, "Out_Of_DayOff_By_Working_On_DayOff")
        data.lable = "Nghỉ bù"
        await this.UserModel.update(user._id, {
          '$set': {
            remainByWorkingOnDayOff: user.remainByWorkingOnDayOff - input.subtractHour,
          }
        })
        break;
      case "6":
        data.lable = "Nghỉ thay thế"
        break;
      default: throw new ApiException(404, "Type_Not_Exist")
    }

    //Kiểm tra ngày chọn có phải ngày nghỉ trong setting time không
    let checkDate = moment(data.date).format("YYYY-MM-DD")
    let checkSettingTime = await this.SettingModel.checkTime(checkDate)
    let checkHolyday = await this.SettingModel.checkHoliday(checkDate)
    if (checkSettingTime) throw new ApiException(400, "DayOff_Warning")
    if (checkHolyday) throw new ApiException(400, "Holiday_Warning")

    // add dayoff vào list dayoff trong user
    // let listDayOff = { _id: data._id, date: data.date, isoDate: input.isoDate, type: data.type, lable: data.lable }
    // if (moment(data.date).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD") && data.type != "6") {
    //   await this.UserModel.update(user._id, {
    //     '$push': {
    //       dayOffs: listDayOff,
    //     }
    //   })
    // }

    let result = await this.Model.insertOne(data)
    return result
  }

  async delete({ request, response }) {
    let { mana_holiday } = request.permissions
    if (mana_holiday === undefined) {
      throw new ApiException(403, "No_Del_Permission")
    }
    let input = request.query
    let dayOff = await this.Model.getOne({ _id: ObjectId(String(input.ids)) }, { userId: 1, type: 1, date: 1, subtractHour: 1 })
    let user = await this.UserModel.getOne({ _id: dayOff.userId }, { remainLastYear: 1, remainThisYear: 1, remainByWorkingOnDayOff: 1 })

    switch (dayOff.type) {
      case "3":
        let addLastYear = user.remainLastYear
        let addThisYear = user.remainThisYear
        if (user.remainLastYear > 0) {
          addLastYear = addLastYear + 1
          let remainTotal = user.remainThisYear + addLastYear
          await this.UserModel.update(user._id, {
            '$set': {
              remainLastYear: addLastYear,
              remainTotal: remainTotal
            }
          })
        } else {
          addThisYear = addThisYear + 1
          await this.UserModel.update(user._id, {
            '$set': {
              remainThisYear: addThisYear,
              remainTotal: addThisYear
            }
          })
        }
        break;
      case "5":
        await this.UserModel.update(user._id, {
          '$set': {
            remainByWorkingOnDayOff: user.remainByWorkingOnDayOff + dayOff.subtractHour,
          }
        })
        break;
    }

    // await this.UserModel.update(user._id, {
    //   '$pull': {
    //     dayOffs: {
    //       date: dayOff.date
    //     }
    //   }
    // })

    return await super.delete({ request, response })
  }
}

module.exports = DayOffController
