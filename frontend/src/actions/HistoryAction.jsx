import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class HistoryAction extends BaseAction {
  get actions() {
    return {
      edit: {
        method: 'put',
        url: '/api/v1/histories/:_id',
        type: 'History.edit'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/histories',
        type: 'History.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/histories/:_id',
        type: 'History.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default HistoryAction.export()