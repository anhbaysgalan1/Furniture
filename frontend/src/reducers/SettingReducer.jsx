import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class SettingReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Setting.updateTimeSetting": {
        path: "updateTimeSetting"
      },
      "Setting.getTimeSetting": {
        path: "timeSetting"
      },
      "Setting.getHolidaySetting": {
        path: "holidaySetting"
      }
    }
  }

  get initialState() {
    return {
      ...super.initialState,
      error: {
        message: null
      }
    }
  }
}
/*
 * bắt buộc gọi hàm export()
 */
export default SettingReducer.export()