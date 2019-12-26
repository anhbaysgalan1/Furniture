import React from 'react'
import View from 'views/ShoesCabinet/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import GoodsAction from '../../actions/GoodsAction'
import OrderAction from '../../actions/OrderAction'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
   constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
   }

   componentDidMount() {
      this.props.dispatch(GoodsAction.getBadByType({ typeGoods: '2' }))
   }

   onSubmit(values) {
      this.props.dispatch(OrderAction.create(values))
         .then(data => {
            if (!data.error) {
               this.notify(I18n.t('Message.createDataSuccess'))
               // this.goto("/bad")
            }
            else {
               let err = data.error
               switch (err.status) {
                  case 400: {
                     if (err.message === "Role_Name_Exist") {
                        this.notify(I18n.t('Backend.Role.Role_Name_Exist'), 'error')
                     }
                     break
                  }
                  default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')
               }
            }
         })
   }

   render() {
      return (
         <View
            onSubmit={this.onSubmit}
            goods={this.props.goods}
         />
      )
   }
}

const mapStateToProps = state => {
   return {
      goods: selector(state, "goods.getBadByType", [])
   }
}

export default withRouter(connect(mapStateToProps)(Index))