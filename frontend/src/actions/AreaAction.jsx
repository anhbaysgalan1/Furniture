import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class AreaAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/areas',
        type: 'Area.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/areas/:_id',
        type: 'Area.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/areas/:_id',
        type: 'Area.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/areas',
        type: 'Area.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/areas',
        type: 'Area.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/areas/:_id',
        type: 'Area.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default AreaAction.export()