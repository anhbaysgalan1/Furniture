import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class TimekeepingReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Timekeeping.create": {
        path: "data"
      },
      "Timekeeping.edit": {
        path: "data"
      },
      "Timekeeping.delete": {
        path: "data"
      },
      "Timekeeping.destroy": {
        path: "data"
      },
      "Timekeeping.fetchAll": {
        path: "list"
      },
      "Timekeeping.fetch": {
        path: "item"
      },
      'Timekeeping.fetchDistanceFuel': {
        path: "data"
      }
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
export default TimekeepingReducer.export()