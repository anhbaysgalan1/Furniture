const BaseModel = use("./BaseModel")
const moment = use("moment")
const Common = use("App/Common/common")
class TotalWorkingHour extends BaseModel {
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
   
}

module.exports = TotalWorkingHour
