const BaseModel = use("./BaseModel")
class Position extends BaseModel{
  constructor(){
    super()
  }
  static get collectionName(){
    return "positions"
  }
  static get relationship(){
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

module.exports = Position
