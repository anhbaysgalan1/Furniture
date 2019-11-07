import React, {PureComponent } from 'react'
import _ from 'lodash'
class BaseView extends PureComponent{

  getData(obj, path, defaultValue = undefined) {
    let value = _.get(obj, path, defaultValue)
    if (value == null) return defaultValue
    return value
  }
  goto(path){
    if(!this.props.history){
      return console.error("need export with withRouter() to redirect page.")
    }
    this.props.history.push(path)
  }
  textLink(text, path){
    return (
      <div onClick={() => this.goto(path)} style={{cursor: "pointer"}}>
          {text}
      </div>
    )
  }
}

export {BaseView}
export default BaseView