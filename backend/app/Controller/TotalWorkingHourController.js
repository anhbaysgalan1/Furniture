const BaseController = use("./BaseController")
const HistoryModel = use("App/Models/History")
const UserModel = use("App/Models/User")
const TotalWorkingHourModel = use("App/Models/TotalWorkingHour")
const ConstructionModel = use("App/Models/Construction")
const _ = use('lodash')
const ApiException = use("App/Exceptions/ApiException")
const Common = use("App/Common/common")
const moment = use('moment')
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class TotalWorkingHourController extends BaseController {
    constructor() {
        super()
        this.Model = new TotalWorkingHourModel()
        this.HistoryModel = new HistoryModel()
        this.UserModel = new UserModel()
        this.ConstructionModel = new ConstructionModel()
    }

    async index({ request, response }) {
        let input = request.query
        let allowFields = {
            userId: 1,
            date: 1,
            isoDate: 1,
            constructions: 1,
            totalWorkTime: 1,
            workTime: 1
        }
        let startDate = Common.string_to_ISO(input.startDate);
        let endDate = Common.string_to_ISO(input.endDate);

        let result = await this.Model.aggregation([
            {
                $match: {
                    isoDate: {
                        $gte: startDate,
                        $lte: endDate
                    },
                }
            },
            {
                $unwind: "$constructions"
            },
            {
                $group: {
                    _id: {
                        userId: "$userId",
                        constructionId: "$constructions.constructionId"
                    },
                    workTime: { $sum: "$constructions.workTime" }
                }
            },
            {
                $group: {
                    _id: "$_id.userId",
                    constructions: {
                        $push: {
                            constructionId: "$_id.constructionId",
                            workTime: "$workTime"
                        }
                    },
                    totalWorkTime: { $sum: "$workTime" }
                }
            }
        ]).getForGridTable(input, allowFields)

        let promises = result.data.map(item => {
            return Promise.all(
                item.constructions.map(construction => {
                    return this.ConstructionModel.getById(construction.constructionId, { name: 1, code: 1 })
                })
            )
        })

        let constructInfo = await Promise.all(promises)

        result.data.map((rs, i) => {
            rs.constructions.map((construct, j) => {
                delete constructInfo[i][j]._id
                return Object.assign(construct, constructInfo[i][j])
            })
        })

        return result
    }
}



module.exports = TotalWorkingHourController
