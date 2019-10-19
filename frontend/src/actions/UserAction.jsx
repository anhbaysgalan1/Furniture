import BaseAction from './BaseAction'

class UserAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/users',
        type: 'User.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/users/:_id',
        type: 'User.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/users/:_id',
        type: 'User.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/users',
        type: 'User.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/users',
        type: 'User.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/users/:_id',
        type: 'User.fetch'
      },
      login: {
        method: 'post',
        url: '/api/v1/users/login',
        type: 'User.login'
      },
      editPassword: {
        method: 'put',
        url: '/api/v1/users/editpassword/:_id',
        type: 'User.editPassword'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/users/getApprover',
        type: 'User.getApprover'
      },
      updateLineToken: {
        method: 'put',
        url: '/api/v1/users/updateLineToken',
        type: 'User.updateLineToken'
      },
      getTimeList: {
        method: 'get',
        url: '/api/v1/users/getTimeList',
        type: 'User.getTimeList'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default UserAction.export()