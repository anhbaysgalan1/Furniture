import BaseAction from './BaseAction'

class GoodsAction extends BaseAction {
  get actions() {
    return {
      create: {
        method: 'post',
        url: '/api/v1/goods',
        type: 'Goods.create'
      },
      edit: {
        method: 'put',
        url: '/api/v1/goods/:_id',
        type: 'Goods.edit'
      },
      destroy: {
        method: 'delete',
        url: '/api/v1/goods/:_id',
        type: 'Goods.destroy'
      },
      delete: {
        method: 'delete',
        url: '/api/v1/goods',
        type: 'Goods.delete'
      },
      fetchAll: {
        method: 'get',
        url: '/api/v1/goods',
        type: 'Goods.fetchAll'
      },
      fetch: {
        method: 'get',
        url: '/api/v1/goods/:_id',
        type: 'Goods.fetch'
      },
      getBadByType: {
        method: 'get',
        url: '/api/v1/goods/getBadByType',
        type: 'Goods.getBadByType'
      },
      getTypeGoods: {
        method: 'get',
        url: '/api/v1/goods/getTypeGoods',
        type: 'Goods.getTypeGoods'
      },
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default GoodsAction.export()