const BaseController = use("./BaseController")
const SettingModel = use("App/Models/Setting")
const Auth = use("Auth")
const ApiException = use("App/Exceptions/ApiException")
const moment = require('moment-timezone');
const Env = use('Env');
const _ = use('lodash')
/*
  Xem hàm mẫu BaseController nếu muốn viết lại các action
*/
class SettingController extends BaseController {
    constructor() {
        super()
        this.Model = new SettingModel()
    }

    async index({ request, response }) {
        let allowFields = {
            _id: 1,
            name: 1,
            code: 1,
            insert: {
                when: 1
            }
        }
        return await this.Model.aggregation().getForGridTable(request.query, allowFields)
    }

    async getTimeList({ request, response }) {
        return await this.Model.findByCondition({ key: "time" }, {})
    }

    async detail({ request, response }) {
        let id = request.params.id || null
        if (!id) throw new ApiException(422, "ID is required!")

        switch (id) {
            case 'time':
                return await this.getTimeList({ request, response })
            case 'holiday':
                return await this.Model.getHolidaySetting()
        }
    }

    async update({ request, response }) {
        let id = request.params.id || null
        if (!id) throw new ApiException(422, "ID is required!")
        switch (id) {
            case 'time':
                return this.updateTimeSetting({ request, response });
            case 'holiday':
                return this.updateHolidaySetting({ request, response })
        }
    }

    async updateTimeSetting({ request, response }) {
        const allowFields = {
            time: [{
                type: 'string!',
                workingtimeStart: 'date!',
                workingTimeEnd: 'date!',
                noonBreakStart: 'date!',
                noonBreakEnd: 'date!',
                overTimeBeforeStart: 'date!',
                overTimeBeforeEnd: 'date!',
                overTimeStart: 'date!',
                overTimeEnd: 'date!',
                overTimeNightStart: 'date!',
                overTimeNightEnd: 'date!',
                roundStart: 'number!',
                roundStartType: 'number!',
                roundEnd: 'number!',
                roundEndType: 'number!',
                workingDay: ['number'],
                holidayInProvision: ['number'],
                holidayOutProvision: ['number'],
                is60Time: 'boolean!'
            }]
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        //check xem gửi thiếu mảng không
        let types = data.time.map(item => item.type).sort()
        if (!_.isEqual(['A', 'B', 'C'], types)) {
            throw new ApiException(422, "Vui lòng truyền setting time là A, B, C!")
        }

        const LANG = Env.get("LANG", "jp")
        let startOfDay
        if (LANG === 'vi') {
            startOfDay = moment(data.workingtimeStart).tz('Asia/Ho_Chi_Minh').startOf('day').toISOString()
        } else {
            startOfDay = moment(data.workingtimeStart).tz('Asia/Tokyo').startOf('day').toISOString()
        }

        let {time =[]} = data
        time = time.map(item =>{
            return{
                ...item,
                startOfDay
            }
        })
        return await this.Model.updateTimeSetting(time)
    }

    async updateHolidaySetting({ request, response }) {
        const allowFields = {
            data: ['object']
        }
        const data = this.validate(request.body, allowFields, { removeNotAllow: true })
        return await this.Model.updateHolidaySetting(data)
    }

    async destroy({ request, response }) {
        return []
        return await super.destroy({ request, response })
    }

    async delete({ request, response }) {
        return []
        return await super.delete({ request, response })
    }
}

module.exports = SettingController
