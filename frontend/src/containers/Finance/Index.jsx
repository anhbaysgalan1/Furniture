import React from 'react'
import View from 'views/Finance/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import FinanceAction from '../../actions/FinanceAction'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
        this.refTable = null
        this.onFetchData = this.onFetchData.bind(this)
        this.onRefTable = this.onRefTable.bind(this)
        this.onDeleteData = this.onDeleteData.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
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

    componentDidMount() {
        this.props.dispatch(FinanceAction.fetchAll({ pageSize: -1 }))
    }
    onFetchData(state) {
        this.props.dispatch(FinanceAction.fetchAll(state))
    }

    onRefTable(ref) {
        this.refTable = ref
    }

    onDeleteData(selectedIds) {
        this.props.dispatch(FinanceAction.delete({
            ids: selectedIds
        }))
            .then(result => {
                if (!result.error) {
                    //success
                    this.notify(I18n.t('Message.deleteGroupDataSuccess'))
                    if (this.refTable) {
                        this.refTable.onSelectionChange([])
                        this.refTable.onFetchData({ currentPage: 0 })
                    }
                } else {
                    let err = result.error
                    switch (err.status) {
                        case 405: {
                            if (err.message === "Role_Has_User") {
                                this.notify(I18n.t('Backend.Role.Role_Has_User'), 'error')
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

    render() {
        return (
            <div>
                <View
                    onSubmit={this.onSubmit}
                    onFetchData={this.onFetchData}
                    onRefTable={this.onRefTable}
                    onDeleteData={this.onDeleteData}
                    data={this.props.data}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: selector(state, "finance.list", {}),
    }
}

export default withRouter(connect(mapStateToProps)(Index))