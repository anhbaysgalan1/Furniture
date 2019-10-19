import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class AreaReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Area.create": {
        path: "data"
      },
      "Area.edit": {
        path: "data"
      },
      "Area.delete": {
        path: "data"
      },
      "Area.destroy": {
        path: "data"
      },
      "Area.fetchAll": {
        path: "list"
      },
      "Area.fetch": {
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
export default AreaReducer.export()