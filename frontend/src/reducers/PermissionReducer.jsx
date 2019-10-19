import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class PermissionReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      // "Permission.create": {
      //   path: "data"
      // },
      // "Permission.edit": {
      //   path: "data"
      // },
      // "Permission.delete": {
      //   path: "data"
      // },
      // "Permission.destroy": {
      //   path: "data"
      // },
      "Permission.fetchAll": {
        path: "list"
      },
      "Permission.fetch": {
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
export default PermissionReducer.export()