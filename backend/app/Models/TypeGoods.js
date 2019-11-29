const BaseModel = use("./BaseModel")
class TypeGoods extends BaseModel {
   constructor() {
      super()
   }
   static get collectionName() {
      return "type_goods"
   }
   static get relationship() {
      return {
      }
   }
}

module.exports = TypeGoods