'use strict'
const _ = use('lodash')
const debug = require('debug')('mqcontroller')
const ApiException = use("App/Exceptions/ApiException")
const { ObjectId } = use('mongodb')
const moment = require("moment")
class BaseController {
  constructor() {
  }

  async index({ request, response, allowFields = {} }) {
    return await this.Model.aggregation().getForGridTable(request.query, allowFields)
  }

  async detail({ request, response, allowFields = {} }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "ID is required!")

    return await this.Model.getById(id, allowFields)
  }

  async store({ request, response, allowFields = {} }) {
    let input = request.body
    //allowFields là object các trường được phép lưu vào db
    /* const allowFields = {
      name: "string!",
      password: "string!",
      status: "string"
    } */
    const data = this.validate(input, allowFields, { removeNotAllow: false })
    //check exist data here

    //insert to database
    let result = await this.Model.insertOne(data)
    return result
  }

  async update({ request, response, allowFields = {} }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "ID is required!")

    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(404, "Object not found! id is incorrect.")

    //allowFields là object các trường được phép lưu vào db
    /* const allowFields = {
      name: "string",
      password: "string",
      status: "string"
    } */
    const data = this.validate(request.body, allowFields, { removeNotAllow: false })
    return await this.Model.update(id, data)
  }

  async destroy({ request, response }) {
    let id = request.params.id
    if (!id) throw new ApiException(422, "ID is required!")

    let exist = await this.Model.getById(id)
    if (!exist) throw new ApiException(404, "Object not found! id is incorrect.")
    return await this.Model.delById(id)
  }

  async delete({ request, response }) {
    let ids = request.query.ids
    if (!ids || !Array.isArray(ids)) throw new ApiException(422, "ID is required. Expected: Array!")
    await this.Model.delByIds(ids)
    return true
  }


  /**
   * Kiểm tra tính hợp lệ của dữ liệu client gửi vào API.
   * @param {object} data dữ liệu từ client gửi lên
   * @param {object} allowFields object các field và kiểu dữ liệu mà api chấp nhận
   * @param {object}
   *          {boolean} removeNotAllow xóa các trường không có trong allowFields, default: false
   */
  validate(data, allowFields, options) {
    options = options || { removeNotAllow: false }
    let result = this.validateFields(data, allowFields, options.removeNotAllow)
    if (result.error) {
      throw new ApiException(422, result.message)
    }
    return result.data
  }
  validateError(errorType, data) {
    let message = "unknown"
    switch (errorType) {
      case "Invalid Type":
        message = `Datatype of ${data.path} is incorrect. Expected: ${data.typeOfField} but got: ${data.realType}`
        break
      case "required":
        message = `${data.path} is required. But not found.`
    }
    return {
      error: true,
      message: message
    }
  }

  //đệ quy để check required
  checkRequired(allowFields) {
    if (typeof allowFields === 'string' && allowFields.indexOf("!") !== -1) {
      return true
    } else if (Array.isArray(allowFields) || typeof allowFields === 'object') {
      for (let index in allowFields) {
        let isRequired = this.checkRequired(allowFields[index])
        if (isRequired) return true
      }
    } else { return false }
  }


  validateFields(data, allowFields = {}, removeNotAllow = false, path = "", newData = null) {
    debug("path: ", path)
    debug("data: ", data),
      debug("allowFields: ", allowFields)
    let result = {
      error: false,
      message: "OK",
    }
    let root = false
    if (newData == null) {
      root = true
      newData = removeNotAllow ? {} : data
    }
    if (typeof allowFields == "string") {
      debug("type is string...")
      let typeOfField = allowFields
      let isRequired = typeOfField.indexOf("!") !== -1 //kiểm tra dấu ! ở cuối là bắt buộc
      typeOfField = typeOfField.replace(/\!/, "") //tách lấy kiểu dữ liệu mong muốn
      let isExists = data !== undefined
      if (path[path.length - 1] == ".") path = path.substring(0, path.length - 1)

      if (isRequired && !isExists) { //nếu field là bắt buộc như lại không tồn tại trong data.
        let error = this.validateError("required", {
          path
        })
        debug(error.message)
        return error
      } else if (isExists) {
        let realType = typeof data
        let typeAllowed = realType == typeOfField

        //nếu không đúng kiểu dữ liệu mong muốn, thì cố gắng convert về đúng kiểu.
        if (!typeAllowed) {
          if (typeOfField == "any") {
            typeAllowed = true
          } else if (typeOfField == "number") {
            typeAllowed = !isNaN(data)
            if (typeAllowed) _.set(newData, path, Number(data))
          } else if (typeOfField == "boolean") {
            if (typeof data == "string") data = data.toLowerCase()
            typeAllowed = ["true", "false", "1", "0", 1, 0, true, false].includes(data)
            if (typeAllowed) _.set(newData, path, ["true", "1", 1, true].includes(data))
          } else if (typeOfField == "date" || typeOfField == "moment") {
            typeAllowed = new Date(data) != "Invalid Date" || !data
            if (typeAllowed) {
              let IsoDate = moment(new Date(data))
              IsoDate.set('second', 0)
              IsoDate.set('millisecond', 0)
              _.set(newData, path, new Date(IsoDate))
            }
          } else if (typeOfField == "objectid") {
            typeAllowed = ObjectId.isValid(data)
            if (typeAllowed) _.set(newData, path, new ObjectId(data))
          }
        }
        else {
          _.set(newData, path, data)
        }
        debug({ typeOfField, realType, typeAllowed })

        if (!typeAllowed) {
          return this.validateError("Invalid Type", {
            path,
            typeOfField,
            realType
          })
        }
      }
    } else {
      //duyệt các key của object.
      for (let fieldName in allowFields) {
        let typeOfField = allowFields[fieldName]
        let fieldValue = data ? data[fieldName] : undefined

        debug("Loop for check:", fieldName)
        debug("data: ", fieldValue)
        debug("allowFields", allowFields[fieldName])

        //kiểm tra nếu là array thì đệ quy tiếp vào các element để check
        if (Array.isArray(typeOfField)) {
          if (Array.isArray(fieldValue)) {
            debug("case 1: check array:")
            if (fieldValue.length === 0 && this.checkRequired(typeOfField[0])) {
              debug("element is required but array empty")
              return this.validateError('required', {
                path: `${path}${fieldName}`
              })
            }
            //nếu mảng rỗng thì gán value là mảng rỗng
            if(fieldValue.length === 0){
              _.set(newData, `${path}${fieldName}`, [])
            }
            for (let i in fieldValue) {
              result = this.validateFields(fieldValue[i], typeOfField[0], removeNotAllow, `${path}${fieldName}.${i}.`, newData)
              if (result.error) return result
            }
          } else {
            debug("case 2: check array but data is not array")
            if (fieldValue == undefined) {
              //return this.validateError("required",{path: `${path}${fieldName}`})
              result = this.validateFields(fieldValue, typeOfField[0], removeNotAllow, `${path}${fieldName}[0].`)
            } else {
              return this.validateError("Invalid Type", {
                path: `${path}${fieldName}`,
                typeOfField: "array",
                realType: typeof fieldValue
              })
            }

            //result = this.validateFields(fieldValue, typeOfField[0], `${path}${fieldName}[0].`)
          }

        } else if (typeof typeOfField == "object") {
          //nếu là là object thì đệ quy vào trong để check tiếp
          debug("case 3: check object:")
          result = this.validateFields(fieldValue, typeOfField, removeNotAllow, `${path}${fieldName}.`, newData)
        } else {
          //nếu là string thì đệ quy để nhảy vào check các phần tử lá
          debug("case 4: check type is string:")
          result = this.validateFields(fieldValue, typeOfField, removeNotAllow, `${path}${fieldName}`, newData)
        }
        if (result.error) {
          return result
        } else {
          result = {
            ...result,
            data: {
              ...result.data,
            }
          }
        }
      }
    }  
    if (root) {
      return {
        ...result,
        data: newData
      }
    }
    return result
  }
}

module.exports = BaseController
