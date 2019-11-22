const BaseModel = use("./BaseModel")
class Order extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "order"
    }
    static get relationship() {
        return {
            goods: {
                relationType: "belongsTo", //hasMany, belongsTo
                model: "App/Models/Goods",
                localField: "goodsId",
                foreignField: "_id",
            },  
        }
    }

}

module.exports = Order