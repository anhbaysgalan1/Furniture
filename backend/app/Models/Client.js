const BaseModel = use("./BaseModel")
class Goods extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "client"
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

module.exports = Goods