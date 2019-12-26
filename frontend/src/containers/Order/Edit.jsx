import React from 'react'
import View from 'views/Order/Edit'
import OrderAction from '../../actions/OrderAction'
import GoodsAction from '../../actions/GoodsAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import _ from "lodash"

/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class Edit extends BaseContainer {
   constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
   }

   componentDidMount() {
      this.id = this.props.match.params.id
      this.props.dispatch(OrderAction.fetch({ _id: this.id }))
      this.props.dispatch(GoodsAction.fetchAll({ pageSize: -1 }))
   }

   onSubmit(values) {
      this.props.dispatch(OrderAction.edit({ _id: this.id, ...values }))
      .then(data => {
         if (!data.error) {
            this.notify(I18n.t('Message.editDataSuccess'))
            // this.goto(`/order/${this.id}`)
            this.goto("/order")
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
            data={this.props.data || {}}
            goods={this.props.goods}
            onSubmit={this.onSubmit}
         />
      )
   }
}

const mapStateToProps = state => {
   return {
      data: selector(state, "order.item", {}),
      goods: selector(state, "goods.list.data", []),
   }
}

export default withRouter(connect(mapStateToProps)(Edit))