import React from 'react'
import View from 'views/Bad/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import OrderAction from  '../../actions/OrderAction'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        this.props.dispatch(OrderAction.create(values))
        .then(data => {
            if (!data.error) {
                this.notify(I18n.t('Message.createDataSuccess'))
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
            <div>
                <View onSubmit={this.onSubmit}/>
            </div>
         
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default withRouter(connect(mapStateToProps)(Index))