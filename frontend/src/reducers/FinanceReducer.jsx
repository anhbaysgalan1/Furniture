import BaseReducer from './BaseReducer'
class ManageFinanceReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Finance.login": {
        path: "data"
      },
      "Finance.create": {
        path: "data"
      },
      "Finance.edit": {
        path: "data"
      },
      "Finance.fetchAll": {
        path: "list"
      },
      "Finance.fetch": {
        path: "item"
      },
      "Finance.delete": {
        path: "data"
      },
      "Finance.destroy": {
        path: "data"
      },
      "Finance.getApprover": {
        path: "data.getApprover"
      },
      "Finance.updateLineToken": {
        path: "data.updateLineToken"
      } 
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
export default ManageFinanceReducer.export()