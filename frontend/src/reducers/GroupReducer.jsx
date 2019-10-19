import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class GroupReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Group.create": {
        path: "data"
      },
      "Group.edit": {
        path: "data"
      },
      "Group.delete": {
        path: "data"
      },
      "Group.fetchAll": {
        path: "list"
      },
      "Group.fetch": {
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
export default GroupReducer.export()