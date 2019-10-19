import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class HourReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Hour.create": {
        path: "data"
      },
      "Hour.edit": {
        path: "data"
      },
      "Hour.delete": {
        path: "data"
      },
      "Hour.destroy": {
        path: "data"
      },
      "Hour.fetchAll": {
        path: "list"
      },
      "Hour.fetch": {
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
export default HourReducer.export()