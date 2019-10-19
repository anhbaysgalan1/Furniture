const BaseModel = use("./BaseModel")
const DatabaseException = use("App/Exceptions/DatabaseException")
const moment = use("moment")
const { ObjectId } = require('mongodb')
const ApiException = use("App/Exceptions/ApiException")
class Construction extends BaseModel {
  constructor() {
    super()
  }
  static get collectionName() {
    return "constructions"
  }
  static get relationship() {
    return {
      /* area: {
        relationType: "hasMany",
        model: "App/Models/Area",
        localField: "areaIds",
        foreignField: "_id",

      },
      user: {
        relationType: "hasMany",
        model: "App/Models/Group",
        unwind: true,
        localField: "_id",
        foreignField: "group_id",
      } */
    }
  }

  async getValidList(allowFields = {}) {
    let list = await this.findByCondition(
      {
        dateEnd: {
          $gte: new Date()
        }
      }, allowFields)
      return list
  }

  async isExist(ids, length) {
    let [error, result] = await to(this.collection.find({ _id: { $in: ids } }).toArray());

    if (error) throw new DatabaseException(error);
    if (result.length === length) {
      return true;
    }
  }

  //dem so ngay ma user duoc phan cong de tinh ti le di lam
  async countUserSchedules(userid, joindate) {
    let checkDate = moment(joindate).add(6, 'months').format('YYYY-MM-DD')
    checkDate = new Date(checkDate)
    let [error, result] = await to(this.collection.aggregate(
      [
        {
          $unwind: "$schedules"
        },
        {
          $addFields: {
            schedulesDay: {
              $dateFromString: {
                dateString: "$schedules.start"
              }
            }
          }
        },
        {
          $match: {
            schedulesDay: {
              $lte: checkDate
            },
            $or: [
              {
                "schedules.employees.value": ObjectId(userid)
              },
              {
                "schedules.manage.value": ObjectId(userid)
              }
            ]
          }
        },
        {
          $group: {
            _id: "$schedules.start",
          }
        },
        {
          $count: "schedules_day"
        }
      ]
    ).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  //get list Construction in Request
  async listConstructionByUserId(id, date, allowfields = {}) {
    let [error, result] = await to(this.collection.aggregate([
      { $unwind: "$schedules" },
      {
        "$match": {
          $or: [
            {
              "schedules.employees.value": ObjectId(id)
            },
            {
              "schedules.manage.value": ObjectId(id)
            }
          ],
          'schedules.start': date
        }
      },
      {
        $addFields: {
          listManager: '$schedules.manage'
        }
      },
      {
        $project: allowfields

      }
    ]).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  async getByUserId(id, start) {
    let [error, result] = await to(this.collection.find({
      "schedules": {
        $elemMatch: {
          "start": start,
          "$or": [
            { "employees.value": ObjectId(id) },
            { "manage.value": ObjectId(id) },
          ]

        }
      }
    }, {
      code: 1,
      name: 1,
      address: 1,
      cost: 1,
      amount: 1,
      workNight: 1,
      contructionProfit: 1
    }).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }
  async getByConstructionIds(ids) {
    let promise = []
    let result
    promise = ids.map(id => this.getById(id, {
      code: 1,
      name: 1,
      address: 1,
      cost: 1,
      amount: 1,
      workNight: 1
    }))
    try {
      result = await Promise.all(promise)
    }
    catch (error) {
      throw new DatabaseException(error)
    }
    return result
  }
  async getConstructionInCalendar(id, yearMonth) {
    let [error, result] = await to(this.collection.aggregate([
      { $unwind: "$schedules" },
      {
        $addFields: {
          requestMonth: {
            $substr: [
              "$schedules.start", 0, 7
            ]
          }
        }
      },
      {
        "$match": {
          $or: [
            {
              "schedules.employees.value": id
            },
            {
              "schedules.manage.value": id
            }
          ],
          requestMonth: yearMonth
        }
      },
      {
        $project: {
          code: 1,
          name: 1,
          address: 1,
          cost: 1,
          amount: 1,
          contructionProfit: 1,
          schedules: 1
        }
      }
    ]).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  async getAllDayByUserId(id) {
    let [error, result] = await to(this.collection.aggregate([
      { $unwind: "$schedules" },
      {
        "$match":
        {
          "schedules.employees.value": id
        }
      },
      {
        $project: {
          code: 1,
          name: 1,
          address: 1,
          cost: 1,
          amount: 1,
          schedules: 1
        }
      }
    ]).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  async deleteEmployee(start, userId) {
    let [error, result] = await to(this.collection.updateMany(
      {
        "schedules.start": start,
      },
      {
        "$pull":
        {
          "schedules.$.employees":
          {
            "value": ObjectId(userId)
          },
          "schedules.$.manage":
          {
            "value": ObjectId(userId)
          }
        }
      }
    ))
    if (error) throw new DatabaseException(error);
    return result;

  }

  async isNormalDay(constructions) {
    if (!constructions || !Array.isArray(constructions)) throw new ApiException(422, "constructions is required. Expected: Array!")
    let promise = []
    let result
    promise = constructions.map(con => this.getById(con.constructionId, {
      _id: 0,
      workNight: 1
    }))
    try {
      result = await Promise.all(promise)
      for (let construction of result) {
        if (construction.workNight) {
          return false
        }
      }
      return true
    }
    catch (error) {
      throw new DatabaseException(error)
    }
  }

  async insertWorkNightProps(constructions) {
    if (!constructions || !Array.isArray(constructions)) throw new ApiException(422, "constructions is required. Expected: Array!")
    let promise = []
    let result
    promise = constructions.map(con => this.getById(con.constructionId, {
      _id: 0,
      workNight: 1
    }))

    try {
      result = await Promise.all(promise)
      constructions.map((con, i) => {
        constructions[i] = Object.assign(con, result[i]);
      })
    }
    catch (error) {
      throw new DatabaseException(error)
    }
    return constructions
  }

  //kiem tra ban ghi trong qua khu de so sanh khi update
  // async compareSchedules(id, date) {
  //   let [error, result] = await to(this.collection.find({
  //     // _id: id,
  //     "schedules.end": {
  //       $gt: date
  //     }
  //   }, {
  //       schedules: 1
  //     }).toArray());
  //   if (error) throw new DatabaseException(error);
  //   return result;
  // }

}

module.exports = Construction
