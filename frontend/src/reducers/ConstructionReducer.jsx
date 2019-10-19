import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class ConstructionReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Construction.create": {
        path: "data"
      },
      "Construction.edit": {
        path: "data"
      },
      "Construction.delete": {
        path: "data"
      },
      "Construction.destroy": {
        path: "data"
      },
      "Construction.fetchAll": {
        path: "list"
      },
      "Construction.fetch": {
        path: "item"
      },
      "Construction.overRide": {
        path: "overRide"
      },
      "Construction.getByUserIdAndDate": {
        path: "getByUserIdAndDate"
      },
      "Construction.getListUser": {
        path: "getListUser"
      },
      "Construction.listCheckIn": {
        path: "listCheckIn"
      },
      "Construction.listHolidayContruction": {
        path: "listHolidayContruction"
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
export default ConstructionReducer.export()