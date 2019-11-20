const BaseModel = use("./BaseModel")
class Client extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "client"
    }
    static get relationship() {
        return {
            goods: {
                relationType: "belongsTo", //hasMany, belongsTo
                model: "App/Models/Goods",
                localField: "goodsIds",
                foreignField: "_id",
            },
        }
    }

}

module.exports = Client