import BaseAction from './BaseAction'

class ClientAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/client',
        type: 'Client.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/client/:_id',
        type: 'Client.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/client/:_id',
        type: 'Client.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/client',
        type: 'Client.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/client',
        type: 'Client.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/client/:_id',
        type: 'Client.fetch'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/client/getApprover',
        type: 'Client.getApprover'
      },
      getTimeList: {
        method: 'get',
        url: '/api/v1/client/getTimeList',
        type: 'Client.getTimeList'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default ClientAction.export()