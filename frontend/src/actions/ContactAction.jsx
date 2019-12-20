import BaseAction from './BaseAction'

class ContactAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/contact',
        type: 'Contact.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/contact/:_id',
        type: 'Contact.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/contact/:_id',
        type: 'Contact.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/contact',
        type: 'Contact.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/contact',
        type: 'Contact.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/contact/:_id',
        type: 'Contact.fetch'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default ContactAction.export()