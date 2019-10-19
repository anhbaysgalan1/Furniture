const BaseTrait = use("./BaseTrait")
class GetForGridTable extends BaseTrait {

  constructor(target){
    super(target)
    this.aggregation = target
  }

  get publicMethod() {
    return ["getForGridTable"]
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }
  /**
   * Hàm để tạo ra conditions search phục vụ cho React Table
   * Dữ liệu vào là 1 mảng các filter.
   * Dữ liệu ra là 1 mảng các condition
   * @param ['{"id":"account","value":"1"}',
                          '{"id":"fullname","value":"2"}' ]
      */
  async buildFilterForGridTable(filters) {
    let conditions = {}
    try {
      for (let filter of filters) { // foreach mảng filters
        if (typeof filter == "string") filter = JSON.parse(filter) // chuyển filter thành json để lấy ID và value
        if (filter.columnName) {
          let value = filter.value
          let operation = filter.operation || "contains"
          let dataType = filter.dataType
          //let type = this.Model.getTypeofField(filter.columnName)
          let condition = null

          switch (dataType) {
            case "text":
              value = String(value).trim()
              break
            case "date":
              //value = new Date(value)
              break
            case "number":
              value = Number(value)
              break
            default:
              console.log(`unknown data type: ${dataType} in GridTable's filter.`)
          }

          switch (operation) {
            case "contains":
              condition = new RegExp(this.escapeRegExp(String(value).trim()), 'i') // không phân biệt hoa thường. search LIKE
              break
            case "notContains":
              condition = {
                $not: new RegExp(this.escapeRegExp(String(value).trim()), 'i')
              }
              break
            case "startsWith":
              condition = new RegExp('^' + this.escapeRegExp(String(value).trim()), 'i') // không phân biệt hoa thường. search LIKE
              break
            case "endsWith":
              condition = new RegExp(this.escapeRegExp(String(value).trim()) + '$', 'i') // không phân biệt hoa thường. search LIKE
              break
            case "equal":
              if (dataType === "text" || typeof value === "string") {
                condition = new RegExp('^' + this.escapeRegExp(String(value).trim()) + '$', 'i') // không phân biệt hoa thường. search LIKE
              } else {
                condition = {
                  $eq: value
                }
              }
              break
            case "notEqual":
              if (dataType === "text" || typeof value === "string") {
                condition = {
                  $not: new RegExp('^' + this.escapeRegExp(String(value).trim()) + '$', 'i') // không phân biệt hoa thường. search LIKE
                }
              } else {
                condition = {
                  $ne: value
                }
              }
              break
            case "greaterThan":
              condition = {
                $gt: value
              }
              break
            case "graterThenOrEqual":
              condition = {
                $gte: value
              }
              break
            case "lessThan":
              condition = {
                $lt: value
              }
              break
            case "lessThanOrEqual":
              condition = {
                $lte: value
              }
              break
            case "daterange":
              let startDate = new Date(value.startDate || 0)
              let endDate = value.endDate ? new Date(value.endDate) : new Date()
              condition = {
                $gte: startDate,
                $lte: endDate
              }
              break
            default:
              console.log(`unknown operation: ${operation} in GridTable's filter.`)
          }
          if (condition) conditions[filter.columnName] = condition
        }
      }
    } catch (e) {
      console.error("condition error: ", e.message, filters)
    }
    return conditions
  }

  buildSortForGridTable(sorts) {
    let sortCondition = {}
    sorts.forEach((sort) => { // foreach mảng sorts
      if (typeof sort == "string") sort = JSON.parse(sort) // chuyển filter thành json để lấy ID và value
      if (sort.columnName) {
        sortCondition[sort.columnName] = sort.direction == "desc" ? -1 : 1
      }
    })

    return sortCondition
  }

  /**
   * Hàm sử dụng để lấy dữ liệu cho React Table.
   * @param {*} params : bao gồm các condition, filter, sort....
   * @param {*} column : các cột muốn select ra.
   */
  async getForGridTable(params, column) {
    let {
      pageSize,
      currentPage,
      sorting,
      filters
    } = params
    filters = filters || [] // lấy giá trị filters của table
    sorting = sorting || []
    currentPage = parseInt(currentPage) || 0 // khởi tạo số page hiện tại của table
    pageSize = parseInt(pageSize) || 5 // số item/trang

    let skip = currentPage * pageSize
    let conditions = await this.buildFilterForGridTable(filters)
    let sort = this.buildSortForGridTable(sorting)
    currentPage = currentPage + 1 // Grid Table trả về số page bắt đàu từ 0, nên +1 để đúng dữ liệu.
    return await this.aggregation.lookupR({
      ...column,
      $match: conditions
    }).getListPagination(skip, pageSize, sort)
  }
}

module.exports = GetForGridTable
