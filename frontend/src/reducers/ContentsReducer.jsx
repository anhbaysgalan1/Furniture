import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class ContentsReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Contents.create": {
        path: "data"
      },
      "Contents.edit": {
        path: "data"
      },
      "Contents.delete": {
        path: "data"
      },
      "Contents.destroy": {
        path: "data"
      },
      "Contents.fetchAll": {
        path: "list"
      },
      "Contents.fetch": {
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
export default ContentsReducer.export()