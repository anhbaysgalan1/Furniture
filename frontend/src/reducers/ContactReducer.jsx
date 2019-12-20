import BaseReducer from './BaseReducer'
class ManageContactReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Contact.login": {
        path: "data"
      },
      "Contact.create": {
        path: "data"
      },
      "Contact.edit": {
        path: "data"
      },
      "Contact.fetchAll": {
        path: "list"
      },
      "Contact.fetch": {
        path: "item"
      },
      "Contact.delete": {
        path: "data"
      },
      "Contact.destroy": {
        path: "data"
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
export default ManageContactReducer.export()