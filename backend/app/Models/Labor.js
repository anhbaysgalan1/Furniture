const BaseModel = use("./BaseModel")
const moment = use("moment")
const Common = use("App/Common/common")
class Labor extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "constructions"
    }
    static get relationship() {
        return {

        }
    }

    uniqArray(array, prop) {
        let counts = {}
        array.map(element => {
            counts[element[prop]] = true
        })
        return Object.keys(counts).length;
    }
    //get unique date and all workers in constructions
    getDateAndWorkers(data, dateRange) {
        let employees = []
        let totalDays = 0
        data.schedules.map((schedule) => {
            let date = Common.string_to_ISO(schedule.start)
            const isValid = moment(date).isBetween(dateRange.startDate, dateRange.endDate, null, '[]');
            if(isValid){
                totalDays++
                employees = employees.concat(schedule.employees);
            }
        })
        return {
            totalDays: totalDays,
            totalWorkers: this.uniqArray(employees, 'value')
        }
    }
    //get total salary and time in construction all time
    totalSalary(data, history) {
        let detail = this.detailSalary(history, data._id)
        //cộng tiền lương + giờ làm ngày đang tính vào data
        data.totalSalary += detail.salaryPerDay
        data.totalTime += detail.workingHourPerDay;
        return data
    }

    detailSalary(history, _id) {
        //tìm kiếm đúng construction trong list construction
        let construction = history.constructions.filter(con => String(con.constructionId) === String(_id))
        let workingHourThisDay = 0
        construction.map(con => {
            workingHourThisDay += Number(con.workTime)
        })
        //tính tiền lương từ tổng giờ làm ngày đang xét
        let salaryThisDay = this.salaryThisDay(workingHourThisDay, history.user.remuneration)
        return {
            ...history,
            workingHourPerDay: workingHourThisDay,
            salaryPerDay: salaryThisDay
        }
    }

    msToHour(ms) {
        var tempTime = moment.duration(ms);
        return (tempTime.hours() + tempTime.minutes() / 60);
    }

    salaryThisDay(ms, remuneration) {
        return Math.floor(this.msToHour(ms) * remuneration / 8)
    }
}

module.exports = Labor
