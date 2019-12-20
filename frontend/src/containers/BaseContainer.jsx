import React, { Component } from 'react'
import _ from 'lodash'
import UtilityAction from 'actions/UtilityAction'
import { I18n } from 'react-redux-i18n'
import Modal from 'components/Dialogs/Modal'
class BaseContainer extends Component {
  constructor(props) {
    if (!window.navigator.onLine) {
      window.location.reload(true)
    }
    super(props)
    this.deleteQuery()
  }

  //dùng để delete query khi chuyển sidebar
  deleteQuery() {
    const items = { ...localStorage }
    let { pathname = "-1" } = window.location || {}
    // lấy name ra để xem màn nào
    let [, name] = pathname.split('/')
    name = name.substring(0, name.length - 1)
    Object.keys(items).map(prop => {
      //xóa filter trong table khi chuyển menu màn khác
      if (prop.includes("gridTable")) {
        items[prop] = JSON.parse(items[prop])
        if (prop.search(new RegExp(name, "i")) === -1 && typeof items[prop] === "object") {
          this.resetSettingByName(prop, items[prop])
        }
      }

      //xóa filter ngoài table khi chuyển menu màn khác
      if (prop.includes("filter.")) {
        if (prop.search(new RegExp(name, "i")) === -1) {
          localStorage.removeItem(prop)
        }
      }
    })
  }

  //reset các thuộc tính lưu trong localStorage
  resetSettingByName(name, setting = {}) {
    setting.filters = []
    setting.currentPage = 0
    setting.sorting = []
    window.localStorage.setItem(name, JSON.stringify(setting))
  }

  goto(path) {
    if (!this.props.history) {
      return console.error("need export with withRouter() to redirect page.")
    }
    this.props.history.push(path)
  }

  getData(obj, path, defaultValue = undefined) {
    let value = _.get(obj, path, defaultValue)
    if (value == null) return defaultValue
    return value
  }

  handleDataAction(actionObject, actionName, nextProps, options = {
    success: null,
    error: null,
    dataKey: "data",
    errorKey: "error",
    lastTypeKey: "lastType"
  }) {
    let defaultOptions = {
      success: null,
      error: null,
      dataKey: "data",
      errorKey: "error",
      lastTypeKey: "lastType"
    }
    options = {
      ...defaultOptions,
      ...options
    }
    const lastType = this.getData(nextProps, options.lastTypeKey)
    const type = this.getData(actionObject, `actions.${actionName}.type`)
    const error = this.getData(nextProps, options.errorKey, {})
    const data = this.getData(nextProps, options.dataKey, {})

    if (lastType === undefined || type === undefined) {
      console.error("lastType or action.type is undefined in handleChangeReducer")
      return false
    }
    if (nextProps.lastType !== type) return false
    if (error.status == null) {
      //success
      if (typeof options.success === "function") options.success(data)
      return true
    }
    else {
      //error
      if (typeof options.error === "function") options.error(error)
      return false
    }
  }

  notify(message, type = "success") {
    this.props.dispatch(UtilityAction.notify({
      message: message,
      type: type
    }))
  }

  setFieldError(fieldName, error) {
    let errorState = {
      ...this.state.error,
      [fieldName]: {
        value: error,
        modifiedAt: new Date()
      }
    }
    this.setState({ error: errorState })
  }
}

export default BaseContainer

export const selector = (state, path, defaultValue) => {
  return _.get(state, path, defaultValue)
}