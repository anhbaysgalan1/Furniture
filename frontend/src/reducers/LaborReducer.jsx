import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class LaborReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Labor.create": {
        path: "data"
      },
      "Labor.edit": {
        path: "data"
      },
      "Labor.delete": {
        path: "data"
      },
      "Labor.destroy": {
        path: "data"
      },
      "Labor.fetchAll": {
        path: "list"
      },
      "Labor.fetch": {
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
export default LaborReducer.export()