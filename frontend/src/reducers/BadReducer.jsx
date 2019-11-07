import BaseReducer from './BaseReducer'
class BadReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Bad.login": {
        path: "data"
      },
      "Bad.create": {
        path: "data"
      },
      "Bad.edit": {
        path: "data"
      },
      "Bad.fetchAll": {
        path: "list"
      },
      "Bad.fetch": {
        path: "item"
      },
      "Bad.delete": {
        path: "data"
      },
      "Bad.destroy": {
        path: "data"
      },
      "Bad.getApprover": {
        path: "data.getApprover"
      },
      "Bad.updateLineToken": {
        path: "data.updateLineToken"
      },
      "Bad.getTimeList": {
        path: "getTimeList"
      },
    }
  }

  get initialState() {
    return {
      ...super.initialState,
      error: {
        message: null
      }
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default BadReducer.export()