import BaseAction from './BaseAction'

class WorkerAction extends BaseAction {
    get actions() {
        return {
            checkIn: {
                method: 'post',
                url: '/api/v1/workers/checkin',
                type: 'Worker.checkIn'
            },
            checkOut: {
                method: 'post',
                url: '/api/v1/workers/checkout',
                type: 'Worker.checkOut'
            },
            initCheckTime: {
                method: 'get',
                url: '/api/v1/workers/initCheckTime',
                type: 'Worker.initCheckTime'
            },
            updateCheckOut: {
                method: 'put',
                url: '/api/v1/workers/updateCheckOut',
                type: 'Worker.updateCheckOut'
            },
        }
    }
}
/*
 * bắt buộc gọi hàm export()
 */
export default WorkerAction.export()