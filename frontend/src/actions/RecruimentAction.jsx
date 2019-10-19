import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class RecruimentAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/recruiments',
        type: 'Recruiment.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/recruiments/:_id',
        type: 'Recruiment.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/recruiments/:_id',
        type: 'Recruiment.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/recruiments',
        type: 'Recruiment.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/recruiments',
        type: 'Recruiment.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/recruiments/:_id',
        type: 'Recruiment.fetch'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default RecruimentAction.export()