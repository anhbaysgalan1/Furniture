const BaseModel = use("./BaseModel")
class Bad extends BaseModel {
    constructor() {
        console.log("modal 1")
        super()
    }
    static get collectionName() {
        console.log("modal 2")
        return "bads"
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

}

module.exports = Bad