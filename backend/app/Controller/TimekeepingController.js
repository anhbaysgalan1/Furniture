const BaseController = use("./BaseController")
const Common = use("App/Common/common")
const TimekeepingModel = use("App/Models/Timekeeping")
const ApiException = use("App/Exceptions/ApiException")
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class TimekeepingController extends BaseController {
  constructor() {
    super()
    this.Model = new TimekeepingModel()
  }

  async distanceFuelIndex({ request, response }) {
    let input = request.query
    input.startDate = Common.string_to_ISO(input.startDate)
    input.endDate = Common.string_to_ISO(input.endDate)
    let validateQuery = {
      _id: 'objectid!',
      startDate: 'date!',
      endDate: 'date!'
    }

    const data = this.validate(input, validateQuery, { removeNotAllow: true })
    let result = await this.Model.getDistanceAndFuel(data)
    return result
  }

  async update({ request, response }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "ID is required!")

    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(404, "Object not found! id is incorrect.")
    const allowFields = {
      work_distance: "number",
      personal_distance: "number",
      fuel: "number"
    }
    const data = this.validate(request.body, allowFields, { removeNotAllow: true })
    await this.Model.update(id, data)
    return []
  }
}

module.exports = TimekeepingController
