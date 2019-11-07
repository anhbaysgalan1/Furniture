import BaseReducer from './BaseReducer'
class UserReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "User.login": {
        path: "data"
      },
      "User.create": {
        path: "data"
      },
      "User.edit": {
        path: "data"
      },
      "User.fetchAll": {
        path: "list"
      },
      "User.fetch": {
        path: "item"
      },
      "User.delete": {
        path: "data"
      },
      "User.destroy": {
        path: "data"
      },
      "User.getApprover": {
        path: "data.getApprover"
      },
      "User.updateLineToken": {
        path: "data.updateLineToken"
      },
      "User.getTimeList": {
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
export default UserReducer.export()