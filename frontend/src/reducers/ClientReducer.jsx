import BaseReducer from './BaseReducer'
class ClientReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Client.login": {
        path: "data"
      },
      "Client.create": {
        path: "data"
      },
      "Client.edit": {
        path: "data"
      },
      "Client.fetchAll": {
        path: "list"
      },
      "Client.fetch": {
        path: "item"
      },
      "Client.delete": {
        path: "data"
      },
      "Client.destroy": {
        path: "data"
      },
      "Client.getApprover": {
        path: "data.getApprover"
      },
      "Client.updateLineToken": {
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
export default ClientReducer.export()