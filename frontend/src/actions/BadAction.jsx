import BaseAction from './BaseAction'

class BadAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/bads',
        type: 'Bad.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/bads/:_id',
        type: 'Bad.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/bads/:_id',
        type: 'Bad.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/bads',
        type: 'Bad.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/bads',
        type: 'Bad.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/bads/:_id',
        type: 'Bad.fetch'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/bads/getApprover',
        type: 'Bad.getApprover'
      },
      getTimeList: {
        method: 'get',
        url: '/api/v1/bads/getTimeList',
        type: 'Bad.getTimeList'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default BadAction.export()