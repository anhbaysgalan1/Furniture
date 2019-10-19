import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class CalendarAction extends BaseAction {
    get actions() {
        return {
            detailPast: {
                method: 'get',
                url: '/api/v1/calendars/detailPast',
                type: 'Calendar.detailPast'
            },
            listConstruction: {
                method: 'get',
                url: '/api/v1/calendars/listConstruction',
                type: 'Calendar.listConstruction'
            },
            listConstructionCalendar: {
                method: 'get',
                url: '/api/v1/calendars/listConstructionCalendar',
                type: 'Calendar.listConstructionCalendar'
            },
            listHistoryCalendar: {
                method: 'get',
                url: '/api/v1/calendars/listHistoryCalendar',
                type: 'Calendar.listHistoryCalendar'
            },
            listWorkerRequestsCalendar: {
                method: 'get',
                url: '/api/v1/calendars/listWorkerRequestsCalendar',
                type: 'Calendar.listWorkerRequestsCalendar'
            },
            listUserDayOffCalendar: {
                method: 'get',
                url: '/api/v1/calendars/listUserDayOffCalendar',
                type: 'Calendar.listUserDayOffCalendar'
            },
        }
    }
}
/*
 * bắt buộc gọi hàm export()
 */
export default CalendarAction.export()