import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class PermissionAction extends BaseAction {
  get actions() {
    return {
      // create: {
      //   method: 'post',
      //   url: '/api/v1/permissions',
      //   type: 'Permission.create'
      // },
      // edit: {
      //   method: 'put',
      //   url: '/api/v1/permissions/:_id',
      //   type: 'Permission.edit'
      // },
      // destroy: {
      //   method: 'delete',
      //   url: '/api/v1/permissions/:_id',
      //   type: 'Permission.destroy'
      // },
      // delete: {
      //   method: 'delete',
      //   url: '/api/v1/permissions',
      //   type: 'Permission.delete'
      // },
      fetchAll: {
        method: 'get',
        url: '/api/v1/permissions',
        type: 'Permission.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/permissions/:_id',
        type: 'Permission.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default PermissionAction.export()