import BaseReducer from './BaseReducer'
class GoodsReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Goods.login": {
        path: "data"
      },
      "Goods.create": {
        path: "data"
      },
      "Goods.edit": {
        path: "data"
      },
      "Goods.fetchAll": {
        path: "list"
      },
      "Goods.fetch": {
        path: "item"
      },
      "Goods.delete": {
        path: "data"
      },
      "Goods.destroy": {
        path: "data"
      },
      "Goods.getBadByType": {
        path: "getBadByType"
      },
      "Goods.getTypeGoods": {
        path: 'getTypeGoods'
      }
      // "Goods.getApprover": {
      //   path: "data.getApprover"
      // },
      // "Goods.updateLineToken": {
      //   path: "data.updateLineToken"
      // },
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
/**
 * bắt buộc gọi hàm export()
 */
export default GoodsReducer.export()