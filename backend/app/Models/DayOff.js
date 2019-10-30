const BaseModel = use("./BaseModel")
const moment = use("moment")
const { ObjectId } = require('mongodb')
const DatabaseException = use("App/Exceptions/DatabaseException")


class DayOff extends BaseModel {
  constructor() {
    super()
  }
  static get collectionName() {
    return "day_offs"
  }
  static get relationship() {
    return {
      /* area: {
        relationType: "hasMany",
        model: "App/Models/Area",
        localField: "areaIds",
        foreignField: "_id",

      },
      */
      User: {
        relationType: "belongsTo",
        model: "App/Models/User",
        localField: "userId",
        foreignField: "_id",
      }
    }
  }

  //tinh toan ngay nghi duoc cap nam nay
  async getDayOffThisYear(today, joinDate) {
    let dayOffThisYear = 10
    let workedTime = moment(today).diff(moment(joinDate).utc().startOf('day').toISOString(), "months")
    if (18 <= workedTime && workedTime < 30) {
      dayOffThisYear += Math.floor((workedTime - 6) / 12)
    }
    if (workedTime >= 30) {
      workedTime = workedTime <= 78 ? workedTime : 78
      dayOffThisYear += Math.floor((workedTime - 30) / 12) * 2 + 2
    }
    return dayOffThisYear
  }
  //lấy ngày nghỉ có lương và nghỉ bù
  async getRosteredAndPaidDayOff(userId, { startDate, endDate }) {
    let [error, result] = await to(this.collection.aggregate(
      [
        {
          $match: {
            userId: ObjectId(userId),
            type: { $in: ["3", "5"] }
          }
        },
        {
          $addFields: {
            isoDate: {
              $dateFromString: {
                dateString: "$date"
              }
            }
          }
        },
        {
          $match: {
            isoDate: {
              $gte: new Date(startDate),
              $lte: new Date(endDate)
            }
          }
        }, {
          $project: {
            type: 1,
            date: 1
          }
        }
      ]
    ).toArray());
    if (error) throw new DatabaseException(error);
    let paidHoliday = []
    let rosteredDayOff = 0
    result.map(day => {
      if (day.type == 3) {
        paidHoliday.push(day.date)
      }
      if (day.type == 5) {
        rosteredDayOff++
      }
    })
    return { paidHoliday, rosteredDayOff }
  }

  // kiem tra ngay nghi ton tai chua
  async checkValidateDay(date, userId) {
    let [err, result] = await to(this.collection.find({
      date: date,
      userId: userId
    }).toArray())
    if (result.length > 0) return true
    return false
  }

  // lay ra tat ca ban ghi cua nghi bu va tinh tong gio nghi bu da nghi
  async findDayOffByWorking() {
    let [error, result] = await to(this.collection.aggregate(
      [
        {
          $match: {
            type: "5"
          }
        },
        {
          $group: {
            _id: "$userId",
            totalSubtract: { $sum: "$subtractHour" }
          }
        }
      ]
    ).toArray());
    if (error) throw new DatabaseException(error);
    return result
  }

  //lay ra ngay nghi tren lich lam viec cua nhan vien
  async getDayOffCalendar(userid, yearMonth) {
    let [error, result] = await to(this.collection.aggregate(
      [
        {
          $match: {
            userId: ObjectId(userid)
          }
        },
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
            requestMonth: yearMonth
          }
        },
        {
          $project: {
            date: 1,
            type: 1
          }
        }
      ]
    ).toArray());
    if (error) throw new DatabaseException(error);
    return result
  }

  //lay ra danh sach user nghi trong thang
  async getListScheduleUser(date){
    let [error, result] = await to(this.collection.aggregate(
      [
        {
          $match: {
            date: date
          }
        },
        {
          $group: {
            "_id": "$date",
            "listUser": { "$push": "$userId" }
          }
        }
      ]
    ).toArray());
    if (error) throw new DatabaseException(error);
    return result
  }

  // //đếm số ngày nghỉ
  // async countDayOffOfUser(userId, type, dateRange) {
  //   let [error, result] = await to(this.collection.aggregate(
  //     [
  //       {
  //         $match: {
  //           userId: ObjectId(userId),
  //           type: type
  //         }
  //       },
  //       {
  //         $addFields: {
  //           isoDate: {
  //             $dateFromString: {
  //               dateString: "$date"
  //             }
  //           }
  //         }
  //       },
  //       {
  //         $match: {
  //           isoDate: {
  //             $gte: dateRange.startDate,
  //             $lte: dateRange.endDate
  //           }
  //         }
  //       }, {
  //         $project: {
  //           date: 1
  //         }
  //       }
  //     ]
  //   ).toArray());
  //   if (error) throw new DatabaseException(error);
  //   return result
  // }
}

module.exports = DayOff
