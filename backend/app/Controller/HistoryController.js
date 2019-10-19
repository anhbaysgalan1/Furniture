const BaseController = use("./BaseController")
const HistoryModel = use("App/Models/History")
const SetTimeModel = use("App/Models/Setting")
const Usermodel = use("App/Models/User")
const ConstructionModel = use("App/Models/Construction")
const _ = use('lodash')
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const moment = use("moment")
const Common = use("App/Common/common")
const { ObjectId } = use('mongodb')

class HistoryController extends BaseController {
    constructor() {
        super()
        this.Model = new HistoryModel();
        this.SetTimeModel = new SetTimeModel();
        this.Usermodel = new Usermodel();
        this.ConstructionModel = new ConstructionModel()
        this.SetTimeModel = new SetTimeModel()
    }

    async index({ request, response }) {

        let allowFields = {
            date: 1,
            startTime: 1,
            endTime: 1,
            _startTime: 1,
            _endTime: 1,
            User: {
                _id: 1,
                name: 1,
                code: 1
            },
            Construction: {
                code: 1,
                name: 1
            },
            constructions: 1,
            total_workTime: 1,

            insert: {
                when: 1
            }
        }
        let condition = [
            {
                $sort:
                {
                    _id: -1
                }
            }
        ]

        let { history, allow_level_2 } = request.permissions

        if (history === undefined && allow_level_2 === undefined) {
            condition = condition.concat([{
                $match: {
                    userId: ObjectId(Auth.user._id)
                }
            }])
        }
        let { startDate, endDate } = request.query;
        startDate = Common.string_to_ISO(startDate);
        endDate = Common.string_to_ISO(endDate);
        condition.push(
            {
                $match: {
                    isoDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            }
        );
        condition = condition.concat(
            [
                {
                    $lookup: {
                        from: "constructions",
                        localField: "constructions.constructionId",
                        foreignField: "_id",
                        as: "Construction"
                    }
                }
            ]
        )
        let result = await this.Model.aggregation(condition).getForGridTable(request.query, allowFields);



        result.data.map((data, j) => {
            data.Construction.map((con, i) => {
                Object.assign(con, data.constructions[i]);
            })
            delete data.constructions
        })
        return result;
    }

    async detail({ request, response }) {
        let allowFields = {
            latitudeIn: 1,
            longitudeIn: 1,
            startTime: 1,
            endTime: 1,
            _startTime: 1,
            _endTime: 1,
            isNormalDay: 1,
            date: 1,
            userId: 1,
            setting: 1,
            checkInStatus: 1,
            checkOutStatus: 1,
            constructions: 1,
            latitudeOut: 1,
            longitudeOut: 1,
            totalTime: 1,
            total_workTime: 1
        }
        let result = await super.detail({ request, response, allowFields });
        if (!result) return []
        let user = await this.Usermodel.getOne({ _id: result.userId }, {
            _id: 1, name: 1, username: 1
        });
        result = {
            ...result,
            user: user
        }

        //get name and code of constructions
        let constructions = result.constructions
        for (let i in constructions) {
            let _constructions = await this.ConstructionModel.getOne({ _id: constructions[i].constructionId }, {
                _id: 1, name: 1, code: 1
            });
            if (!_constructions) _constructions = {}
            constructions[i] = Object.assign(constructions[i], _constructions)
        }

        result.constructions = constructions
        //tính tổng giờ làm
        if (typeof result === 'object') {
            let { isNormalDay, _endTime, _startTime } = result
            let { noonBreakStart, noonBreakEnd  } = result.setting
            if (_endTime && _startTime) {
                result.total = moment(result._endTime) - moment(result._startTime)
                //trừ giờ ăn trưa nếu là ngày thường
                if (isNormalDay) {
                    let noonHour = this.Model.getIntersectionTime([{
                        startTime: _startTime,
                        endTime: _endTime
                    }, {
                        startTime: noonBreakStart,
                        endTime: noonBreakEnd
                    }])
                    result.total = result.total - noonHour < 0 ? 0 : result.total - noonHour
                }
            }
        }
        return result;
    }

    async update({ request, response }) {
        let id = request.params.id
        if (!id) throw new ApiException(422, "Id_Required")

        let exist = await this.Model.getById(id)
        if (!exist) throw new ApiException(404, "No_Object")

        //check xem có quyền sửa lịch sử không
        let { allow_level_2 } = request.permissions
        let history_day = exist.date

        //check ngày hết hạn sửa
        let currentDay = moment().format('YYYY-MM-DD')
        let expired_day
        if (allow_level_2) {
            expired_day = moment(history_day).add(1, 'months')
                .startOf('month').add(14, 'days')
                .format('YYYY-MM-DD')
        } else {
            expired_day = moment(history_day).endOf('day').format('YYYY-MM-DD')
        }

        if (moment(currentDay) > moment(expired_day)) {
            throw new ApiException(405, "Expired_Update_Warn")
        }

        const allowFields = {
            startTime: "date!",
            endTime: "date!",
            constructions: [{ constructionId: "objectid!", workTime: "number!" }],
            totalTime: "number!",
        }

        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        const { startOfDay, roundStart, roundStartType, roundEnd, roundEndType } = exist.setting
        let _startTime = Common.roundingTime({
            root: startOfDay,
            time: data.startTime,
            range: roundStart,
            type: roundStartType
        })
        data._startTime = new Date(_startTime)
        let _endTime = Common.roundingTime({
            root: startOfDay,
            time: data.endTime,
            range: roundEnd,
            type: roundEndType
        })
        data._endTime = new Date(_endTime)
        //check length of constructions array
        let { constructions } = exist
        if (data.constructions.length !== constructions.length) {
            throw new ApiException(412, "Input_Construct_Warn")
        }

        //assign worknight to store worknight value when the worker checkin
        constructions.map(construction => {
            data.constructions.map((con, i) => {
                if (String(con.constructionId) === String(construction.constructionId)) {
                    data.constructions[i].workNight = construction.workNight
                }
            })
        })

        //validate thời gian làm tại công trường
        let total_workTime = 0
        data.constructions.map(construction => {
            total_workTime += construction.workTime || 0
        })

        if (total_workTime > data.totalTime) {
            throw new ApiException(422, "Input_WorkTime_Warn");
        }

        data.total_workTime = total_workTime
        data.checkOutStatus = true
        let result = await this.Model.update(id, data)
        return result

    }
}

module.exports = HistoryController
