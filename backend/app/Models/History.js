const BaseModel = use("./BaseModel")
const Database = use('Database')
const DatabaseException = use("App/Exceptions/DatabaseException")
const moment = use("moment")
const { ObjectId } = require("mongodb")

class History extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "histories"
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

    //đưa một mảng array các thời gian vào và trả về tổng số thời gian giao nhau của mảng thời gian đó
    getIntersectionTime(intervals) {
        let left = intervals[0].startTime
        let right = intervals[0].endTime
        for (let interval of intervals) {
            if (moment(interval.startTime) > moment(right)
                || moment(interval.endTime) < moment(left)) {
                return 0
            } else {
                left = moment.max(moment(interval.startTime), moment(left))
                right = moment.min(moment(interval.endTime), moment(right))
            }
        }

        return right - left
    }

    async getConstructions(_id) {
        let [error, result] = await to(this.collection.find({
            _id: _id,
        }, {
            constructions: 1,
        }).toArray());
        if (error) throw new DatabaseException(error);
        return result;
    }

    async getInfo(data) {
        let [error, result] = await to(this.collection.find({
            userId: ObjectId(data._id),
            // date: data.date
        }, {
            startTime: 1,
            endTime: 1,
            constructions: 1,
            date: 1
        }).toArray());
        if (error) throw new DatabaseException(error);
        return result;
    }
    async getByConstruction(id, dateRange) {
        let conditions = {
            constructions: {
                $elemMatch: {
                    constructionId: ObjectId(id)
                }
            }
        }

        if (dateRange) {
            conditions = {
                isoDate: {
                    $gte: new Date(dateRange.startDate),
                    $lte: new Date(dateRange.endDate)
                },
                ...conditions,
            }
        }

        let [error, result] = await to(this.collection.find(conditions, {
            startTime: 1,
            date: 1,
            userId: 1,
            constructions: 1,
            remuneration: 1,
            checkInStatus: 1,
            checkOutStatus: 1

        }).sort({ date: 1 }).toArray());
        if (error) throw new DatabaseException(error);
        return result;
    }

    //lay ra user di lam vao ngay nghi
    async getUserWorkOnDayOff() {
        let [error, result] = await to(this.collection.find(
            {
                workOnDayOff: true
            }, {
            userId: 1,
            date: 1
        }).toArray())
        if (error) throw new DatabaseException(error);
        return result;
    }

    //dem so ngay user di lam thuc te de tinh ty le di lam
    async countUserHistory(userid, joindate) {
        let checkDate = moment(joindate).add(6, 'months').format('YYYY-MM-DD')
        checkDate = new Date(checkDate)
        let [error, result] = await to(this.collection.aggregate(
            [
                {
                    $addFields: {
                        workingDay: {
                            $dateFromString: {
                                dateString: "$date"
                            }
                        }
                    }
                },
                {
                    $match: {
                        workingDay: {
                            $lte: checkDate
                        },
                        userId: ObjectId(userid)
                    }
                },
                {
                    $count: "worked_day"
                }
            ]
        ).toArray());
        if (error) throw new DatabaseException(error);
        return result;
    }

    async getHistoryInCalendar(userid, yearMonth) {
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
                    $project: {
                        date: 1,
                        startTime: 1,
                        constructions: 1,
                        endTime: 1
                    }
                }
            ]
        ).toArray());
        if (error) throw new DatabaseException(error);
        return result
    }

    //xoa lich su neu user xin nghi nhung da check in truoc do
    async deleteByRequest(userId, date) {
        let [error, result] = await to(this.collection.deleteOne(
            {
                userId: userId,
                date: date
            },
        ))
        if (error) throw new DatabaseException(error);
        return result;
    }
}

module.exports = History
