import React from 'react'
import View from 'views/Client/Edit'
import ClientAction from '../../actions/ClientAction'
import GoodsAction from '../../actions/GoodsAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import _ from "lodash"


class Edit extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        this.id = this.props.match.params.id
        this.props.dispatch(ClientAction.fetch({ _id: this.id }))
        this.props.dispatch(GoodsAction.fetchAll({ pageSize: -1 }))
    }

    onSubmit(values) {
        this.props.dispatch(ClientAction.edit({ _id: this.id, ...values }))
            .then(data => {
                if (!data.error) {
                    this.notify(I18n.t('Message.editDataSuccess'))
                    this.goto("/client")
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
                goods={this.props.goods}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        //sử dụng selector để lấy state từ redux
        lastType: selector(state, "client.lastType", {}),
        error: selector(state, "client.error", ""),
        data: selector(state, "client.item", {}),
        goods: selector(state, "goods.list.data", []),
    }
}

export default withRouter(connect(mapStateToProps)(Edit))