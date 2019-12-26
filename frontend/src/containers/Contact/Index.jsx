import React from 'react'
import View from 'views/Contact/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import ContactAction from '../../actions/ContactAction'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
   constructor(props) {
      super(props)
      this.onSubmit = this.onSubmit.bind(this)
   }

   onSubmit(values) {
      this.props.dispatch(ContactAction.create(values))
         .then(data => {
            if (!data.error) {
               this.notify(I18n.t('Message.createDataSuccess'))
               this.goto("/contact")
            } else {
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
         <View onSubmit={this.onSubmit} />
      )
   }
}

const mapStateToProps = state => {
   return {
   }
}

export default withRouter(connect(mapStateToProps)(Index))