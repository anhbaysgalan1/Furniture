const BaseModel = use("./BaseModel")
class Finance extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "finance"
    }
    static get relationship() {
        return {
            // goods: {
            //     relationType: "belongsTo", //hasMany, belongsTo
            //     model: "App/Models/Goods",
            //     localField: "goodsId",
            //     foreignField: "_id",
            // },  
        }
    }

}

module.exports = Finance