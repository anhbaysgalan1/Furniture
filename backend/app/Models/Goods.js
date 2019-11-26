const BaseModel = use("./BaseModel")
class Goods extends BaseModel {
    constructor() {
        super()
    }
    static get collectionName() {
        return "goods"
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

    async getBadByType(typeGoods, allowFields) {
        let [error, result] = await to(this.collection.aggregate([
            {
                $match: {
                    typeGoods: typeGoods
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $project: allowFields
            }
        ]).toArray());
        if (error) throw new DatabaseException(error);
        return result;
    }

}

module.exports = Goods