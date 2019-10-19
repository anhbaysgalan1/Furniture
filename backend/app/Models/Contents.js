const BaseModel = use("./BaseModel")
class Contents extends BaseModel{
  constructor(){
    super()
  }
  static get collectionName(){
    return "contents"
  }
  static get relationship(){
    return {
    }
  }
}

module.exports = Contents
