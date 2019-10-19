import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class CalendarReducer extends BaseReducer {
    get actionsAllow() {
        return {
            ...super.actionsAllow,
            "Calendar.detailPast": {
                path: "list"
            },
            "Calendar.listConstruction": {
                path: "dataFull"
            },
            "Calendar.listConstructionCalendar": {
                path: "listConstruction"
            },
            "Calendar.listHistoryCalendar": {
                path: "listHistory"
            },
            "Calendar.listWorkerRequestsCalendar": {
                path: "listWorkerRequests"
            },
            "Calendar.listUserDayOffCalendar": {
                path: "listUserDayOff"
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
export default CalendarReducer.export()