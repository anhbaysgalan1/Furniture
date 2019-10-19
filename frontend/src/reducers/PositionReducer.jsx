import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class PositionReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Position.create": {
        path: "data"
      },
      "Position.edit": {
        path: "data"
      },
      "Position.delete": {
        path: "data"
      },
      "Position.destroy": {
        path: "data"
      },
      "Position.fetchAll": {
        path: "list"
      },
      "Position.fetch": {
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
export default PositionReducer.export()