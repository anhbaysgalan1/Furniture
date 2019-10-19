const BaseModel = use("./BaseModel")
class Report extends BaseModel{
    constructor(){
        super()
    }
    static get collectionName(){
        return "reports"
    }
    static get relationship(){
        return {
            Construction: {
                relationType    : "belongsTo",
                model           : "App/Models/Construction",
                localField      : "constructionId",
                foreignField    : "_id",
            },
            User: {
                relationType    : "belongsTo",
                model           : "App/Models/User",
                unwind          : false,
                localField      : "userId",
                foreignField    : "_id",
            },
            Content: {
                relationType    : "belongsTo",
                model           : "App/Models/Content",
                unwind          : false,
                localField      : "contentId",
                foreignField    : "_id",
            },
            Area: {
                relationType    : "belongsTo",
                model           : "App/Models/Area",
                unwind          : false,
                localField      : "areaId",
                foreignField    : "_id",
            }
        }
    }
}

module.exports = Report
