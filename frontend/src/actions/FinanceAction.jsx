import BaseAction from './BaseAction'

class FinanceAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/finance',
        type: 'Finance.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/finance/:_id',
        type: 'Finance.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/finance/:_id',
        type: 'Finance.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/finance',
        type: 'Finance.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/finance',
        type: 'Finance.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/finance/:_id',
        type: 'Finance.fetch'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/finance/getApprover',
        type: 'Finance.getApprover'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default FinanceAction.export()