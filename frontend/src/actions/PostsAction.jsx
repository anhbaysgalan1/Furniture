import BaseAction from './BaseAction'

class PostsAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/posts',
        type: 'Posts.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/posts/:_id',
        type: 'Posts.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/posts/:_id',
        type: 'Posts.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/posts',
        type: 'Posts.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/posts',
        type: 'Posts.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/posts/:_id',
        type: 'Posts.fetch'
      },
      getApprover: {
        method: 'get',
        url: '/api/v1/posts/getApprover',
        type: 'Posts.getApprover'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default PostsAction.export()