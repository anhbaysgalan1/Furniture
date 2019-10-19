const BaseTrait = use("./BaseTrait")
const _ = use('lodash')
const DatabaseException = use("App/Exceptions/DatabaseException")

class GetListPagination extends BaseTrait {

  constructor(target){
    super(target)
    this.aggregation = target
  }

  get publicMethod() {
    return ["getListPagination"]
  }

  // limit = -1 thì sẽ ko phân trang mà lấy hết
  // trừ trường hợp ko cần điều kiện truy vấn gì thì mới ko cần khởi tạo aggregations
  async getListPagination(skip = 0, limit = -1, sort = {}) {
    // Đếm tổng tất cả các bản ghi
    let aggregateCount = this.aggregation.clone().push([
      { $count: 'total' }
    ]).afterQuery((result) => {
      return _.get(result, "0.total")
    })

    let aggregateData = this.aggregation.clone().setOptions({
      collation: { locale: 'vi' }
    })
    //thêm điều kiện sort
    if (Object.keys(sort).length > 0) {
      aggregateData.add({ $sort: sort })
    }
    //thêm điều kiện limit, skip
    if (limit > 0) {
      aggregateData.add([
        { $skip: skip },
        { $limit: limit },
      ])
    }
    //chạy 2 promise
    let [error, [total, data]] = await to(Promise.all([
      aggregateCount.run(),
      aggregateData.run()
    ]))
    if(error) throw new DatabaseException(error)

    return {
      total: total,
      skip: skip,
      limit: limit,
      data: data
    }
  }
}

module.exports = GetListPagination
