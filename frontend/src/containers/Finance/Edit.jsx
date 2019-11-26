import React from 'react'
import View from 'views/Finance/Edit'
import FinanceAction from '../../actions/FinanceAction'
// import RoleAction from '../../actions/RoleAction'
// import PermissionAction from '../../actions/PermissionAction'
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
      this.props.dispatch(FinanceAction.fetch({ _id: this.id }))
   }

   onSubmit(values) {
      this.props.dispatch(FinanceAction.edit({ _id: this.id, ...values }))
      .then(data => {
         if (!data.error) {
            this.notify(I18n.t('Message.editDataSuccess'))
            this.goto("/finance")
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
               case 404: {
                  if (err.message === "Permission_Not_Exist") {
                     this.notify(I18n.t('Backend.Role.Permission_Not_Exist'), 'error')
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
            data={this.props.data}
            onSubmit={this.onSubmit}
         />
      )
   }
}

const mapStateToProps = state => {
   return {
      data: selector(state, "finance.item", {}),
   }
}

export default withRouter(connect(mapStateToProps)(Edit))