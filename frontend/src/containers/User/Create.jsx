import React from 'react'
import View from 'views/User/Create'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserAction from '../../actions/UserAction'
import { I18n } from 'react-redux-i18n'
import { number } from 'prop-types'
import _ from 'lodash'
import { stat } from 'fs'

class Create extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(values) {
        this.props.dispatch(UserAction.create(values))
            .then(data => {
                if (!data.error) {
                    this.notify(I18n.t('Message.editDataSuccess'))
                    this.goto("/users")
                }
                else {
                    let err = data.error
                    switch (err.status) {
                        case 400: {
                            if (err.message === "User_Code_Exist") {
                                this.notify(I18n.t('Backend.User.User_Code_Exist'), 'error')
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
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        data: selector(state, "user.list", {}),
    }
}

export default withRouter(connect(mapStateToProps)(Create))