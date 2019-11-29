import BaseAction from './BaseAction'

class OrderAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/order',
        type: 'Order.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/order/:_id',
        type: 'Order.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/order/:_id',
        type: 'Order.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/order',
        type: 'Order.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/order',
        type: 'Order.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/order/:_id',
        type: 'Order.fetch'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/order/getApprover',
        type: 'Order.getApprover'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default OrderAction.export()