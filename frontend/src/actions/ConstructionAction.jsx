import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class ConstructionAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/constructions',
        type: 'Construction.create'
      },
      overRide: {
        method: 'put',
        url: '/api/v1/constructions/overRide',
        type: 'Construction.overRide'
      },
      edit: {
        method: 'put',
        url: '/api/v1/constructions/:_id',
        type: 'Construction.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/constructions/:_id',
        type: 'Construction.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/constructions',
        type: 'Construction.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/constructions',
        type: 'Construction.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/constructions/:_id',
        type: 'Construction.fetch'
      }, 
      getByUserIdAndDate: {
        method: 'get',
        url: '/api/v1/constructions/getByUserIdAndDate',
        type: 'Construction.getByUserIdAndDate',
      },   
      getListUser: {
        method: 'get',
        url: '/api/v1/constructions/getListUser',
        type: 'Construction.getListUser',
      }, 
      listCheckIn: {
        method: 'get',
        url: '/api/v1/constructions/listCheckIn',
        type: 'Construction.listCheckIn',
      }, 
      listHolidayContruction: {
        method: 'get',
        url: '/api/v1/constructions/listHolidayContruction',
        type: 'Construction.listHolidayContruction',
      }, 
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default ConstructionAction.export()