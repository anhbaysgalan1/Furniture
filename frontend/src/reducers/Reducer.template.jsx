import BaseReducer from './BaseReducer';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class __CLASSNAME__ extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "__NAME__.create": {
        path: "data"
      },
      "__NAME__.edit": {
        path: "data"
      },
      "__NAME__.delete": {
        path: "data"
      },
      "__NAME__.destroy": {
        path: "data"
      },
      "__NAME__.fetchAll": {
        path: "list"
      },
      "__NAME__.fetch": {
        path: "item"
      },
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
export default __CLASSNAME__.export()