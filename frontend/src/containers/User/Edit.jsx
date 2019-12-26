import React from 'react'
import View from 'views/User/Edit'
import UserAction from '../../actions/UserAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'

/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */

class Edit extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
    }

    componentWillMount() {
        this.id = this.props.match.params.id
        this.props.dispatch(UserAction.fetch({ _id: this.id }))
    }

    onSubmit(values) {
        this.props.dispatch(UserAction.edit({ _id: this.id, ...values }))
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
                        case 404: {
                            if (err.message === "No_Object") {
                                this.notify(I18n.t('Backend.DbObject.No_Object'), 'error')
                            }
                            break
                        }
                        case 422: {
                            if (err.message === "Id_Required") {
                                this.notify(I18n.t('Backend.DbObject.Id_Required'), 'error')
                            }
                            break
                        }
                        default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')

                    }
                }
            })
    }

    onChangePassword(values) {
        console.log("sssss", values)
        this.props.dispatch(UserAction.editPassword({ _id: this.id, ...values }))
        .then(data => {
            if (!data.error) {
                this.notify(I18n.t('Message.editDataSuccess'))
            }
            else {
                this.notify(`Response: [${data.error.status}] ${data.error.message}`, 'error')
            }
        })
    }

    render() {
        return (
            <View
                data={this.props.data}
                onSubmit={this.onSubmit}
                onChangePassword={this.onChangePassword}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        //sử dụng selector để lấy state từ redux
        lastType: selector(state, "user.lastType", {}),
        error: selector(state, "user.error", ""),
        data: selector(state, "user.item", {}),
    }
}

export default withRouter(connect(mapStateToProps)(Edit))