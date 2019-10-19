import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class __CLASSNAME__ extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/__URLNAME__',
        type: '__NAME__.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/__URLNAME__/:_id',
        type: '__NAME__.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/__URLNAME__/:_id',
        type: '__NAME__.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/__URLNAME__',
        type: '__NAME__.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/__URLNAME__',
        type: '__NAME__.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/__URLNAME__/:_id',
        type: '__NAME__.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default __CLASSNAME__.export()