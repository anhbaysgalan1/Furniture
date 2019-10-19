import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class RequestReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Request.create": {
        path: "data"
      },
      "Request.edit": {
        path: "data"
      },
      "Request.delete": {
        path: "data"
      },
      "Request.destroy": {
        path: "data"
      },
      "Request.fetchAll": {
        path: "list"
      },
      "Request.fetch": {
        path: "item"
      },
      "Request.deleteEmployee": {
        path: "item"
      },
      // "Request.getWorkerRequests": {
      //   path: "getRequests"
      // },
      "Request.sendMessage": {
        path: "data"
      },
      "Request.getListMessages": {
        path: "list"
      },
      "Request.getApprover": {
        path: "getApprover"
      },
      "Request.reUpdate": {
        path: "reUpdate"
      },
      "Request.checkExistRequest": {
        path: "checkExistRequest"
      },
      "Request.listHolidayCalendar": {
        path: "listHolidayCalendar"
      },
      "Request.countDayOffRequest": {
        path: "countDayOffRequest"
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
export default RequestReducer.export()