const Database = use('Database')
const Aggregation = use("Database/Aggregation")
const ObjectId = use("Database/ObjectId")
const Auth = use("Auth")
const _ = use('lodash')
const DatabaseException = use("App/Exceptions/DatabaseException")
const GetForGridTable = use("./Traits/GetForGridTable")
const GetListPagination = use("./Traits/GetListPagination")
class BaseModel {
  constructor() {
    this.ObjectId = ObjectId

    //add Trait for Model here
  }

  get collection() {
    return Database.connection.collection(this.collectionName)
  }
  /**
   * Khai báo mối quan hệ giữa các models.
   * hasMany: quan hệ 1 nhiều
   * belongsTo: quan hệ nhiều 1
   */
  static get relationship() {
    return {

    }
  }

  /**
   * tạo 1 aggregation mới
   * @param {array} aggregations: mảng các aggregate khởi tạo, không bắt buộc
   * @param {*} options các thông số option khi khởi tạo, không bắt buộc
   */

  aggregation(aggregations, options) {
    let aggregation = new Aggregation(this, aggregations, options)
    //add Trait for Aggregation here
    GetListPagination.register(aggregation)
    GetForGridTable.register(aggregation)
    return aggregation
  }

  static get collectionName() {
    throw new DatabaseException("collectionName() is required.")
  }

  get collectionName() {
    return this.constructor.collectionName
  }

  lookupWith(relationshipName, asName, prefix = "") {
    let relationship = this.relationship[relationshipName]
    if (!relationship) throw new DatabaseException("not found relationship.")
    let Model = use(relationship.models)
    if (relationship.localField) {
      return {
        $lookup: {
          from: Model.collectionName,
          localField: `${prefix}.${relationship.localField}`,
          foreignField: relationship.foreignField,
          as: asName || relationshipName
        }
      }
    }
    else {
      return {
        $lookup: {
          from: Model.collectionName,
          let: relationship.let,
          pipeline: relationship.pipeline,
          as: asName || relationshipName
        }
      }
    }

  }

  // Thêm điều kiện để bỏ ra những bản ghi đã bị xóa mềm rồi
  excludeSoftDelete(query) {
    if (typeof query !== 'object') {
      console.error(TAG + '[adjustQuery] invalid query, expect object but it is ' + typeof query)
      query = undefined
    }
    var tmp = undefined
    if (query && Object.keys(query).length == 0) {
      query = undefined
    }
    if (!query) {
      query = {
        '$and': []
      }
    }
    if (!query['$and']) {
      tmp = query
      query = {
        '$and': []
      }
      query['$and'].push(tmp)
    }
    query['$and'].push({
      '$or': [{
        'delete': {
          '$exists': false
        }
      },
      {
        'delete': null
      }
      ]
    })
    return query
  }

  // limit = -1 thì sẽ ko phân trang mà lấy hết
  // Mảng aggregations phải được tạo trước và truyền vào,
  // trừ trường hợp ko cần điều kiện truy vấn gì thì mới ko cần khởi tạo aggregations
  async getListPagination(aggregations = [], skip = 0, limit = -1, sort = {}) {
    return await this.aggregation(aggregations).getListPagination(skip, limit, sort)
  }

  // includeSoftDelete: có đếm cả các bản ghi đã bị xóa mềm rồi hay ko, mặc định false là ko đếm
  async count(condition, includeSoftDelete = false) {
    condition = condition || {}
    if (!includeSoftDelete) {
      condition = this.excludeSoftDelete(condition)
    }
    let [error, count] = await to(this.collection.count(condition))
    if (error) throw new DatabaseException(error)

    return count
  }

  async getById(id, project = {}) {
    return await this.getOne({ _id: this.ObjectId(id) }, project)
  }

  async findByCondition(conditions, project = {}) {
    let [error, result] = await to(this.collection.find(
      conditions, project
    ).toArray())
    if (error) throw new DatabaseException(error)
    return result
  }

  async getOne(condition, project = {}) {
    let [error, result] = await to(this.collection.findOne(condition, project))
    if (error) throw new DatabaseException(error)

    return result
  }

  async insertOne(fields) {
    const doer = Auth.user ? Auth.user._id || Auth.user.email : ''
    fields.insert = { when: new Date(), by: doer }
    fields.update = { when: fields.insert.when, by: fields.insert.by }
    let [error, result] = await to(this.collection.insert(fields))
    if (error) throw new DatabaseException(error)

    return _.get(result, "ops[0]")
  }

  async insertMany(items) {
    if (Auth.user) {
      const doer = Auth.user ? Auth.user._id || Auth.user.email : ''
      for (let item of items) {
        item.insert = { when: new Date(), by: doer }
        item.update = { when: item.insert.when, by: item.insert.by }
      }
    }
    let [error, result] = await this.collection.insertMany(items)
    if (error) throw new DatabaseException(error)

    return result.ops
  }

  async update(id, fields) {
    const _id = this.ObjectId(id)
    delete fields['_id'] //xóa fields _id nếu có trong data update
    await this.updateByCondition({ _id: _id }, fields)

    return await this.getById(_id)
  }

  async updateMany(condition, fields) {
    return await this.updateByCondition(condition, fields, { multi: true })
  }

  // Tìm và update theo điều kiện condition
  // Trả về 1 object WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
  async updateByCondition(condition, params = {}, opt = { multi: false }) {
    const operators = ["$set", "$unset", "$push", "$pull"]
    let doer = Auth.user ? Auth.user._id || Auth.user.email : ''

    let fields = {}
    let hasOperator = false
    for (let operator of operators) {
      if (params[operator]) {
        fields[operator] = params[operator]
        hasOperator = true
      }
    }

    if (!hasOperator) {
      fields["$set"] = params
    }
    for (let operator in fields) {
      if (!fields[operator]) delete fields[operator]
    }

    if (!fields['$set']) fields['$set'] = {}
    fields['$set'].update = { when: new Date(), by: doer }
    let [error, result] = await to(this.collection.update(condition, fields, opt))
    // console.log("432423",result)
    if (error) throw new DatabaseException(error)
    return result
  }

  // doc                  : document cần xóa, query từ DB tư trước
  // canDelete            : callback function với tham số là document vừa tìm được, để kiểm tra điều kiện xem có được xóa ko.
  //                        Trả về true hoặc là thông báo lỗi, Phải implement dạng async/await
  // softDelete           : true là xóa mềm (chỉ gắn cờ delete), false là xóa cứng (remove document khỏi collection)
  // actionSoftDelete     : callback function với tham số là document vừa tìm được, để thực hiện update 1 số trường nếu cần thiết.
  //                        Trả về các trường cần update, đã update giá trị, nếu ko cần update gì thì trả về null hoặc {}
  // actionBeforeDelete   : callback, gọi trước khi thực hiện xóa, để xử lý các ràng buộc (tùy nghiệp vụ cụ thể).
  //                        Phải implement dạng async/await
  // actionAfterDelete    : callback gọi sau khi xóa, để update nếu cần (tùy nghiệp vụ cụ thể, VD xóa user xong thì phải xóa profile...).
  //                        Ko cần thiết phải implemnt dạng async/await (tùy trường hợp cụ thể nếu cần đợi actionAfterDelete thực hiện xong thì implement async/await)
  async delByDocument(doc, options = {
    canDelete: null,
    softDelete: false,
    actionSoftDelete: null,
    actionBeforeDelete: null,
    actionAfterDelete: null
  }) {
    const doer = Auth.user ? Auth.user._id || Auth.user.email : ''
    const id = doc._id
    try {
      if (typeof canDelete === 'function') {
        const errMsg = await options.canDelete(doc)
      }
      if (typeof actionBeforeDelete === "function") {
        await options.actionBeforeDelete(doc)
      }
      if (options.softDelete) {
        // xóa mềm
        let fields = null
        if (typeof actionSoftDelete === "function") {
          fields = await options.actionSoftDelete(doc)
        }
        fields = fields || {}
        fields.delete = fields.delete || {}
        fields.delete.when = new Date()
        fields.delete.by = doer
        console.log('[' + this.collectionName + '] Soft Delete by ' + doer + ' -- deleted document _id: ', id)
        await this.collection.update({ _id: this.ObjectId(id) }, { $set: fields })
      } else {
        // xóa cứng
        console.log('[' + this.collectionName + '] Hard Delete by ' + doer + ' -- deleted document _id: ', id)
        await this.collection.remove({ _id: this.ObjectId(id) })
      }
      if (typeof actionAfterDelete === "function") {
        await options.actionAfterDelete(doc)
      }
    }
    catch (error) {
      console.error(error)
      throw new DatabaseException(error)
    }
  }

  // id: id của document cần xóa
  async delById(id, options = {
    canDelete: null,
    softDelete: false,
    actionSoftDelete: null,
    actionBeforeDelete: null,
    actionAfterDelete: null
  }) {
    let [error, doc] = await to(this.getById(this.ObjectId(id)))
    if (error) throw new DatabaseException(error)
    if (!doc) throw new DatabaseException('document (' + id + ') not found')

    return await this.delByDocument(doc, options)
  }

  async delByIds(ids, options = {
    canDelete: null,
    softDelete: false,
    actionSoftDelete: null,
    actionBeforeDelete: null,
    actionAfterDelete: null
  }) {
    if (!ids || !Array.isArray(ids)) {
      if (error) throw new DatabaseException("ids is required!. Expected: Array")
    }
    let promise = []
    promise = ids.map(id => this.delById(id, options))
    try {
      await Promise.all(promise)
    }
    catch (error) {
      throw new DatabaseException(error)
    }
    return true
  }

  // Nếu ko có condition hoặc condition rỗng thì sẽ tương đương với xóa hết, nên bắt buộc phải có condition để tránh rủi ro
  // Mặc định softDelete = true để tránh rủi ro
  async delByCondition(condition, softDelete = true) {
    if (!condition || typeof condition !== "object" || Object.keys(condition).length == 0) {
      throw new DatabaseException('delete condition is required, and must be an object')
    }
    let error, result
    if (options.softDelete) {
      let fields = { delete: { when: new Date(), by: Auth.user._id || Auth.user.email } }
      [error, result] = await to(this.collection.update(condition, { $set: fields }))
      if (error) throw new DatabaseException(error)
      return result
    } else {
      [error, result] = await to(collection.remove(condition))
    }
    if (error) throw new DatabaseException(error)
    return result
  }

  async delField(id, fieldName) {
    let [error, result] = await this.collection.update({ _id: this.ObjectId(id) }, { $unset: { [fieldName]: '' } })
    if (error) throw new DatabaseException(error)
    return result
  }
  // Nếu chưa có thì insert, nếu đã có rồi (_id đã có trong collection) thì update
  // items:
  //   - mảng được tạo trước, và phải có sẵn _id
  //   - nếu items chưa có sẵn _id, thì mỗi item sẽ phải có điều kiện tìm kiếm (e.g item.findCondition = {...})
  async upsertList(items) {
    let doer = Auth.user ? Auth.user._id || Auth.user.email : ''
    let dtNow = new Date()
    let err, collection, results
    let arrBulks = []
    let arrPrms = []
    let BULK_NUM = 500
    for (let i = 0; i < items.length; i++) {
      if (i % BULK_NUM == 0) {
        arrBulks.push(this.collection.initializeUnorderedBulkOp())
      }
      let fields = items[i]
      fields.insert = { when: dtNow, by: doer }
      let findCondition = {}
      if (fields.findCondition) {
        findCondition = fields.findCondition
        delete fields.findCondition
      } else if (fields._id) {
        findCondition = { _id: fields._id }
      } else {
        throw new DatabaseException('Nếu ko có _id, và cũng ko có findCondition thì phải dùng hàm insertMany chứ ko phải dùng upsertList')
      }
      arrBulks[arrBulks.length - 1].find(findCondition).upsert().updateOne({ $set: fields })
    }
    for (let i = 0; i < arrBulks.length; i++) {
      arrPrms.push(arrBulks[i].execute())
    }
    [error, results] = await to(Promise.all(arrPrms))
    if (error) throw new DatabaseException(error)
    return results
  } // upsertList

  static schema() {
    if (this.$schema) return this.$schema
    try {
      this.$schema = use(`App/Models/Schemas/${this.name}.json`)
    }
    catch (e) {
      console.log(`Schema file is not exists. Please create file App/Models/Schemas/${this.name}.json`)
    }
    return this.$schema
  }

  static getTypeofField(fieldName, model) {
    if (!model) model = this
    let fieldElement = fieldName.split(".")
    for (let i = 0; i < fieldElement.length - 1; i++) {
      let subModelName = fieldElement[i]
      let schema = model.schema()
      if (schema[subModelName] === "function") {
        let info = model.relationship[subModelName]
        if (!info.model) {
          throw new DatabaseException(`model field not found in relationship of ${this.name} Model`)
        }
        model = use(info.model)
      }
      else if (schema[subModelName]) {
        let path = fieldElement.slice(i).join(".")
        let type = _.get(schema, path, undefined)
        if (!type) {
          console.error(`not found ${fieldName} in Models ${subModelName}`)
          return ""
        }
        return type
      }
      else {
        console.error("not found relationship in field: ", fieldName, subModelName)
        return ""
      }
    }
    let field = fieldElement[fieldElement.length - 1]
    return (model.schema() || {})[field]
  }

  static getModelByField(fieldName, model) {
    if (!model) model = this
    let fieldElement = fieldName.split(".")
    for (let i = 0; i < fieldElement.length; i++) {
      let subModelName = fieldElement[i]
      let schema = model.schema()
      if (schema[subModelName] === "function") {
        let info = model.relationship[subModelName]
        if (!info.model) {
          throw new DatabaseException(`model field not found in relationship of ${this.name} Model`)
        }
        model = use(info.model)
      }
      else if (!schema[subModelName]) {
        return undefined
      }
    }
    return model
  }
}
module.exports = BaseModel
