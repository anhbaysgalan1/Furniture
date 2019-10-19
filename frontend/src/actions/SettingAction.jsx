import BaseAction from './BaseAction'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class SettingAction extends BaseAction {
  get actions() {
    return {
      updateTimeSetting: {
        method: 'put',
        url: '/api/v1/settings/time',
        type: 'Setting.updateTimeSetting'
      },
      getTimeSetting: {
        method: 'get',
        url: '/api/v1/settings/time',
        type: 'Setting.getTimeSetting'
      },
      updateHolidaySetting: {
        method: 'put',
        url: '/api/v1/settings/holiday',
        type: 'Setting.updateHolidaySetting'
      },
      getHolidaySetting: {
        method: 'get',
        url: '/api/v1/settings/holiday',
        type: 'Setting.getHolidaySetting'
      },
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default SettingAction.export()