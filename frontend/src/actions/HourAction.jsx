import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class HourAction extends BaseAction {
    get actions() {
        return {
            fetchAll: {
                method: 'get',
                url: '/api/v1/hours',
                type: 'Hour.fetchAll'
            },
            fetch: {
                method: 'get',
                url: '/api/v1/hours/:_id',
                type: 'Hour.fetch'
            }
        }
    }
}
/*
 * bắt buộc gọi hàm export()
 */
export default HourAction.export()