import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class HistoryReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "History.edit": {
        path: "data"
      },
      "History.fetchAll": {
        path: "list"
      },
      "History.fetch": {
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
export default HistoryReducer.export()