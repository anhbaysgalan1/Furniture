import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class RoleReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Role.create": {
        path: "data"
      },
      "Role.edit": {
        path: "data"
      },
      "Role.delete": {
        path: "data"
      },
      "Role.destroy": {
        path: "data"
      },
      "Role.fetchAll": {
        path: "list"
      },
      "Role.fetch": {
        path: "item"
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
/*
 * bắt buộc gọi hàm export()
 */
export default RoleReducer.export()