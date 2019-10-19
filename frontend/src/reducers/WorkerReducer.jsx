import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class WorkerReducer extends BaseReducer {
    get actionsAllow() {
        return {
            ...super.actionsAllow,
            "Worker.checkIn": {
                path: "data"
            },
            "Worker.checkOut": {
                path: "data"
            },
            "Worker.initCheckTime": {
                path: "list.data"
            },
            "Worker.updateCheckOut": {
                path: "data"
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
export default WorkerReducer.export()