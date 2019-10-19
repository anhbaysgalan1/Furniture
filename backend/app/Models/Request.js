const BaseModel = use("./BaseModel")
const DatabaseException = use("App/Exceptions/DatabaseException")
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = use('mongodb')
class Request extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "requests"
    }
    static get relationship() {
        return {
            User: {
                relationType: "belongsTo",
                model: "App/Models/User",
                localField: "userId",
                foreignField: "_id",
            }
        }
    }

    async checkExistRequest(date, userId) {
        let [error, result] = await to(this.collection.aggregate(
            [
                {
                    $match: {
                        date: date,
                        // type: type,
                        userId: userId
                    }
                },
                // {
                //     $unwind: "$data"
                // },
                // {
                //     $match: {
                //         "data.constructionId": constructionId
                //     }
                // },
                {
                    $project: {
                        type: 1
                    }
                }
            ]

        ).toArray())
        if (error) throw new DatabaseException(error);
        return result

    }
   
    async getRequestInCalendar(userid, yearMonth) {
        let [error, result] = await to(this.collection.aggregate(
            [
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
                        userId: ObjectId(userid),
                        requestMonth: yearMonth
                    }
                },

                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "User"
                    },

                },
                {
                    $unwind: "$User"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "manage1",
                        foreignField: "_id",
                        as: "Manage1"
                    },

                },
                {
                    $unwind: "$Manage1"
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "manage2",
                        foreignField: "_id",
                        as: "Manage2"
                    },

                },
                {
                    $unwind: "$Manage2"
                },

                {
                    $project: {
                        date: 1,
                        manage1: 1,
                        manage2: 1,
                        content: 1,
                        type: 1,
                        data: 1,
                        replaceDate: 1,
                        status: 1,
                        userId: 1,
                        constructId: 1,
                        User: {
                            name: 1,
                            code: 1
                        },
                        Manage1: {
                            name: 1,
                            code: 1
                        },
                        Manage2: {
                            name: 1,
                            code: 1
                        }
                    }
                }
            ]
        ).toArray());
        if (error) throw new DatabaseException(error);
        return result

    }

    async getTotalCompenHourRequest(userId, thisYear){
        let [error, result] = await to(this.collection.aggregate(
            [
              {
                $match: {
                  type: 5,
                  userId: userId,
                  isoDate: { $gt: thisYear },
                  status: ""
                }
              },
              {
                $group: {
                    _id: "$userId",
                    totalCompenHour: {
                        $sum: "$subtractHour"
                    }
                }
              }
            ]
          ).toArray());
          if (error) throw new DatabaseException(error);
          return result
    }

    async checkReplaceDayOff(day, uid) {
        let [error, result] = await to(this.collection.find({
            date: day,
            type: 6,
            userId: uid,
            status1: true,
            status2: true
        }).count())
        if (error) throw new DatabaseException(error)
        return result
    }

    //get request để tính lương
    async getAcceptedRequests(condition) {
        let [error, result] = await to(this.collection.find(condition).toArray())
        if (error) throw new DatabaseException(error)
        let lateReq = {}
        let overTimeReq = {}
        let replaceDateReq = {}
        result.map(req => {
            let date = req.date
            if (req.type == 1) {
                if (!lateReq[date]) lateReq[date] = 0
                lateReq[date] += req.totalLate
            }

            //lấy xin OT 
            if (req.type == 2) {
                if (!overTimeReq[date]) overTimeReq[date] = []
                req.data.map(ot => {
                    overTimeReq[date].push({
                        startTime: ot.startTime,
                        endTime: ot.endTime
                    })
                })
            }
            if (req.type == 6) {
                replaceDateReq[date] = true
            }
        })
        return { lateReq, overTimeReq, replaceDateReq }
    }

    async findRequestByUser(uid) {
        let [error, result] = await to(this.collection.find({
            $or: [{
                manage1: uid
            }, {
                manage2: uid
            }]
        }, {
            date: 1,
            manage1: 1,
            manage2: 1,
            content: 1,
            type: 1,
            data: 1,
            replaceDate: 1,
            status: 1,
            userId: 1

        }
        ).toArray())

        if (error) throw new DatabaseException(error)
        return result
    }

    async sendMessage(id, data) {
        let exist = await this.getById(id)
        if (!exist) throw new ApiException(404, "Object not found! id is incorrect.")
        let [error, result] = await to(this.collection.update({
            _id: ObjectId(id)
        },
            {
                $push: {
                    messages: data
                }
            }))
        if (error) throw new DatabaseException(error)
        return await this.getById(id, { messages: 1 })
    }

    async accessMessage(id, userId) {
        let exist = await this.getById(id)
        if (!exist) throw new ApiException(404, "Object not found! id is incorrect.")

        if (String(userId) !== String(exist.userId) &&
            String(userId) !== String(exist.manage1) &&
            String(userId) !== String(exist.manage2)) {
            throw new ApiException(403, "you cannot send the message.")
        }
    }
}

module.exports = Request
