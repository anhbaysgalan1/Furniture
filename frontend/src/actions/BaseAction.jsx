import http from '../helpers/http'
import UrlPattern from 'url-pattern'
import _ from 'lodash'
import { I18n } from 'react-redux-i18n'
class BaseAction {
  /**
   * export sử dụng khi export action
   */
  static export() {
    const self = new (this)()
    self.makeActionFromList()
    return self
  }

  constructor() {
    this.http = http
  }
  get actions() {
    return {
      create    : { method: 'post',   url: '', type: '' },
      edit      : { method: 'put',    url: '', type: '' },
      destroy   : { method: 'delete', url: '', type: '' },
      delete    : { method: 'delete', url: '', type: '' },
      fetch     : { method: 'get',    url: '', type: '' },
      fetchAll  : { method: 'get',    url: '', type: '' },
    }
  }

  makeActionFromList() {
    let listAction = Object.keys(this.actions)
    listAction.forEach((action) => {
      this[action] = (params) => {
        let { method, url, type } = this.actions[action]
        //build url từ partern khai báo trong actions
        var pattern = new UrlPattern(url, {
          segmentNameCharset: 'a-zA-Z0-9_-'
        })
        url = pattern.stringify(params)
        return this.requestApi(method, url, params, type)
      }
    })
  }

  requestApi(method, url, params, actionType) {
    return async (dispatch) => {
      //set loading = true
      dispatch({
        type: "loading",
        data: true
      })
      let result
      try {
        //await new Promise(r => setTimeout(r, 3000))
        let response = await this.http[method](url, params)
        result = this.formatResponse(response, actionType)
      }
      catch (e) {
        result = this.formatResponse(e.response, actionType)
      }
      dispatch(result)
      dispatch({
        type: "loading",
        data: false
      })
      return result
    }
  }

  /**
   * format lại dữ liệu trước khi dispatch đối với dữ liệu là response sau khi call api (http)
   * @param {*} response
   * @param {*} actionType
   */
  formatResponse(response, actionType) {
    let result = {
      type: actionType,
      data: {},
      error: null 

    }
    if (!response) {
      result.error = {
        status: -1,
        message: I18n.t('Message.failedRequest')
      }
      return result
    }

    let isSuccess = [200, 201].indexOf(response.status) !== -1 ? true : false
    if (isSuccess) {
      result.data = response.data || `${response.status} ${response.statusText}`
    }
    else {
      result.error = {
        status: response.status,
        message: _.get(response, "data.message", response.statusText),
        data: _.get(response, "data.data", response.statusText)
      }
    }
    return result
  }
}
export default BaseAction
