import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class TimekeepingAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/timekeepings',
        type: 'Timekeeping.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/timekeepings/:_id',
        type: 'Timekeeping.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/timekeepings/:_id',
        type: 'Timekeeping.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/timekeepings',
        type: 'Timekeeping.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/timekeepings',
        type: 'Timekeeping.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/timekeepings/:_id',
        type: 'Timekeeping.fetch'
      },
      fetchDistanceFuel: {
        method: 'get',
        url: '/api/v1/timekeepings/distanceFuelIndex',
        type: 'Timekeeping.fetchDistanceFuel'
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default TimekeepingAction.export()