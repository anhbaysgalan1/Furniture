import BaseReducer from './BaseReducer'
class ManageOrderReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Order.login": {
        path: "data"
      },
      "Order.create": {
        path: "data"
      },
      "Order.edit": {
        path: "data"
      },
      "Order.fetchAll": {
        path: "list"
      },
      "Order.fetch": {
        path: "item"
      },
      "Order.delete": {
        path: "data"
      },
      "Order.destroy": {
        path: "data"
      },
      "Order.getApprover": {
        path: "data.getApprover"
      },
      "Order.updateLineToken": {
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
export default ManageOrderReducer.export()