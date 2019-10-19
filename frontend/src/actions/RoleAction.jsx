import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class RoleAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/roles',
        type: 'Role.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/roles/:_id',
        type: 'Role.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/roles/:_id',
        type: 'Role.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/roles',
        type: 'Role.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/roles',
        type: 'Role.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/roles/:_id',
        type: 'Role.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default RoleAction.export()