import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class PositionAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/positions',
        type: 'Position.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/positions/:_id',
        type: 'Position.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/positions/:_id',
        type: 'Position.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/positions',
        type: 'Position.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/positions',
        type: 'Position.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/positions/:_id',
        type: 'Position.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default PositionAction.export()