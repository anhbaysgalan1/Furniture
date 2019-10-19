const BaseModel = use("./BaseModel")
const bcrypt = use("bcrypt")
const authConfig = use("config/auth")
const DatabaseException = use("App/Exceptions/DatabaseException")
const { ObjectId } = use('mongodb');

class User extends BaseModel {
  constructor() {
    super()
  }
  static get collectionName() {
    return "users"
  }
  static get relationship() {
    return {
      Area: {
        relationType: "belongsTo",
        model: "App/Models/Area",
        localField: "areaId",
        foreignField: "_id",
      },
      Position: {
        relationType: "belongsTo",
        model: "App/Models/Position",
        unwind: false,
        localField: "positionId",
        foreignField: "_id",
      },
      Role: {
        relationType: "belongsTo",
        model: "App/Models/Role",
        localField: "roleId",
        foreignField: "_id",
      },
      // dayOffs: {
      //   relationType: "hasMany",
      //   model: "App/Models/DayOff",
      //   localField: "_id",
      //   foreignField: "userId",
      // }
    }
  }
  async hash(plainPassword) {
    return await bcrypt.hash(plainPassword + authConfig.SECRET_KEY, 10)
  }
  async compare(plainPassword, encryptedPassword) {
    return await bcrypt.compare(plainPassword + authConfig.SECRET_KEY, encryptedPassword)
  }
  async checkLogin({ username, password }) {
    let user = await this.getOne({
      username: username,
    })

    if (!user) return false
    let checkPassword = await this.compare(password, user.password)
    if (!checkPassword) return false
    return user
  }

  async changePassword(_id, newPassword) {
    newPassword = await this.hash(newPassword)
    return await this.update(_id, {
      password: newPassword
    })
  }

  async countUser(condition) {
    let [error, result] = await to(this.collection.find(condition).count());
    if (error) throw new DatabaseException(error);
    return result;
  }
  async getApproverByRole(roleIds) {
    if (!Array.isArray(roleIds)) {
      throw 'need array';
    }
    let [error, result] = await to(this.collection.find({
      roleId: {
        $in: roleIds
      }
    }, {
      _id: 1,
      name: 1,
      code: 1
    }).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  async getAllUsers() {
    let [error, result] = await to(this.collection.find({}, {
      name: 1,
      code: 1
    }).sort({ $natural: 1 }).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }
  // lay ra user da den ngay de update ngay nghi
  async getUpdateDayOffUser(today, allowfields) {
    let [error, result] = await to(this.collection.aggregate([
      {
        $match: {
          sixMonth: today
        }
      },
      {
        $project: allowfields
      }
    ]).toArray());
    if (error) throw new DatabaseException(error);
    return result;
  }

  async getLineTokensByAreaId(areaId, area_all_id) {
    let [error, result] = await to(this.collection.find({
      $or: [{ areaId: ObjectId(area_all_id) }, { areaId: ObjectId(areaId) }]
    }, {
      access_token_line: 1
    }).toArray());
    if (error) throw new DatabaseException(error);
    let access_tokens = result.filter(item => {
      return item.access_token_line
    })
    access_tokens = access_tokens.map(item => item.access_token_line)
    return access_tokens;
  }
}

module.exports = User
