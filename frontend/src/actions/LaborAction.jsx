import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class LaborAction extends BaseAction {
  get actions() {
    return {
      detail: {
        method: 'post',
        url: '/api/v1/labors',
        type: 'Labor.create'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/labors/:_id',
        type: 'Labor.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/labors',
        type: 'Labor.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/labors',
        type: 'Labor.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/labors/:_id',
        type: 'Labor.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default LaborAction.export()