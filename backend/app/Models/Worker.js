const BaseModel = use("./BaseModel")
const Database = use('Database')
const DatabaseException = use("App/Exceptions/DatabaseException")
const { ObjectId } = use('mongodb')
const moment = use("moment")
const Auth = use("Auth")

class Worker extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "histories"
    }

    static get relationship() {
        return {
        }
    }

    async getLastDocument(conditions) {
        let [error, result] = await to(this.collection.find(
            conditions
        ).limit(1).sort({ $natural: -1 }).toArray());
        if (error) throw new DatabaseException(error)
        return result
    }

    async getLastOnlyCheckIn(userId) {
        let result = await this.getLastDocument(
            {
                userId: ObjectId(userId),
                checkInStatus: true,
                checkOutStatus: {
                    $ne: true
                }
            }
        )
        return result
    }

    //get init check in and check out
    async getInitCheckTime(data, constructions, rootDay) {
        
        let result = {};
        //get min and max between nomal schedule and night schedule
        let minStart = moment.min([moment(rootDay.nomal), moment(rootDay.night)]);
        let maxStart = moment.max([moment(rootDay.nomal), moment(rootDay.night)]);

        //start day and end day of client day
        let currentTime = moment(data.currentTime);
        let startDate = moment(data.startDate);
        let endDate = moment(data.endDate);

        let yesterday = moment(data.start).subtract(1, "day").format('YYYY-MM-DD');
        let today = data.start
        //lấy khoảng chắc chắn là ngày hôm qua  
        if (currentTime.isBetween(startDate, minStart)) {
            result = await this.getHistoryAndConstructions(ObjectId(Auth.user._id), yesterday, constructions.yesterday);
        };
        //lấy khoảng chắc chắn là ngày hôm nay
        if (currentTime.isBetween(maxStart, endDate)) {
            result = await this.getHistoryAndConstructions(ObjectId(Auth.user._id), today, constructions.today);
        };
        //giờ 2 khoảng thời gian bắt đầu đầu của 2 ca thì check xem hôm qua có công trường mà chưa check out thì là hôm qua
        //không thì là hôm nay
        if (currentTime.isBetween(minStart, maxStart)) {
            result = await this.isYesterday(constructions, yesterday)
            if (!result) {
                result = await this.getHistoryAndConstructions(ObjectId(Auth.user._id), today, constructions.today)
            }
        }
        return result
    }

    async isYesterday(constructions, yesterday) {
        if (constructions.yesterday.length !== 0) {
            let result = await this.getHistoryAndConstructions(ObjectId(Auth.user._id), yesterday, constructions.yesterday)
            if (result.label !== "done") {
                return result
            }
        }
        return false
    }

    async getHistoryAndConstructions(userId, day, constructions) {
        //gán kết quả chưa tồn tại lịch sử
        let result = {
            label: "not exist",
            checkInStatus: false,
            checkOutStatus: false,
            constructions: constructions,
            day: day,
            startTime: null,
            endTime: null
        }

        let [existHistory] = await this.getLastDocument({
            userId: ObjectId(userId),
            date: day
        })
        if (existHistory) {
            result = {
                label: "exist",
                ...existHistory,
                day: day
            }
        }
      
        return result
    }

    async mergeConstructions(constructions, _constructions) {
        if (constructions.length !== 0) {
            for (let i in constructions) {
                for (let j in _constructions) {
                    if (String(constructions[i]._id) == String(_constructions[j].constructionId)) {
                        _constructions[j] = {
                            ..._constructions[j],
                            ...constructions[i]
                        }
                    }
                }
            }
        }
        return _constructions
    }

}

module.exports = Worker

