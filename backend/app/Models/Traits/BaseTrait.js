const Exception = use("Exception")
class BaseTrait{
  static register(target){
    new (this)(target)
  }
  /**
   *
   */
  constructor(target){
    this.Target = target
    for(let method of this.publicMethod){
      if(typeof this[method] != "function"){
        throw new Exception(`${method} is not function`)
      }
      target[method] = this[method].bind(this)
    }
  }

  get publicMethod(){
    throw new Exception("publicMethod method must be implement.")
  }

}

module.exports = BaseTrait
