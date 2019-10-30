import React from 'react'
import View from 'views/Goods/Edit'
import OrderAction from '../../actions/OrderAction'
// import RoleAction from '../../actions/RoleAction'
// import PermissionAction from '../../actions/PermissionAction'
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
        // this.props.dispatch(PermissionAction.fetchAll({ pageSize: -1 }))
    }

    onSubmit(values) {
        this.props.dispatch(OrderAction.edit({ _id: this.id, ...values }))
            .then(data => {
                if (!data.error) {
                    this.notify(I18n.t('Message.editDataSuccess'))
                    this.goto("/roles")
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
                data={this.props.data || {}}
                onSubmit={this.onSubmit}
                permissions={this.props.permissions || []}
            />
        )
    }
}

const mapStateToProps = state => {

    return {
        //sử dụng selector để lấy state từ redux
        lastType: selector(state, "role.lastType", {}),
        error: selector(state, "role.error", ""),
        data: selector(state, "role.item", {}),
        permissions: selector(state, "permission.list.data", [])
    }
}

export default withRouter(connect(mapStateToProps)(Edit))