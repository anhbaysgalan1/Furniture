const BaseModel = use("./BaseModel")
class Area extends BaseModel{
  constructor(){
    super()
  }
  static get collectionName(){
    return "areas"
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
  async getAreaAll(){
    let [error, result] = await to(this.collection.findOne({
      code: "All"
    }, {
      code: 1
    }));
    if (error) throw new DatabaseException(error);
    return result._id;
  }
}

module.exports = Area
