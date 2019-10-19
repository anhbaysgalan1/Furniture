const BaseModel = use("./BaseModel")
const { ObjectId } = use("mongodb")
class Timekeeping extends BaseModel {
  constructor() {
    super()
  }
  static get collectionName() {
    return "histories"
  }
  static get relationship() {
    return {
      // Constructions: {
      //   relationType: "hasMany",
      //   model: "App/Models/Construction",
      //   localField: "constructions.constructionId",
      //   foreignField: "_id",
      // },
    }
  }
  async getDistanceAndFuel(data) {

    let [error, result] = await to(this.collection.find({
      userId: ObjectId(data._id),
      isoDate: {
        $gte: data.startDate,
        $lte: data.endDate
      }
    },{
      date: 1,
      work_distance: 1,
      personal_distance: 1,
      fuel: 1
    }).toArray());

    if (error) throw new DatabaseException(error);

    return result
  }
}

module.exports = Timekeeping
