import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class ContentsAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/contents',
        type: 'Contents.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/contents/:_id',
        type: 'Contents.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/contents/:_id',
        type: 'Contents.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/contents',
        type: 'Contents.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/contents',
        type: 'Contents.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/contents/:_id',
        type: 'Contents.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default ContentsAction.export()