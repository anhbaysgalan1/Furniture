import React from 'react'
import View from 'views/User/Edit'
import UserAction from '../../actions/UserAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import PositionAction from '../../actions/PositionAction'
import AreaAction from '../../actions/AreaAction'
import RoleAction from '../../actions/RoleAction'
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
        this.props.dispatch(PositionAction.fetchAll({ pageSize: -1 }))
        this.props.dispatch(AreaAction.fetchAll({ pageSize: -1 }))
        this.props.dispatch(RoleAction.fetchAll({ pageSize: -1 }))
        this.props.dispatch(UserAction.getTimeList())
    }
    

    formatData = (values) => {
        let phone = _.get(values, 'phone', '')
        phone = phone.replace(/-/g, '')
        let data = {
            areaId: values.areaId,
            code: values.code,
            joiningDate: values.joiningDate,
            name: values.name,
            timeId: values.timeId,
            phone: phone,
            positionId: values.positionId,
            remainLastYear: Number(values.remainLastYear),
            remainThisYear: Number(values.remainThisYear),
            remainTotal: values.remainTotal,
            roleId: values.roleId,
            username: values.username
        }
        return data
    }

    onSubmit(values) {
        let dataFormat = this.formatData(values)
        this.props.dispatch(UserAction.edit({ _id: this.id, ...dataFormat }))
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
                        case 403: {
                            if (err.message === "No_User_Permission") {
                                this.notify(I18n.t('Backend.User.User_Permission'), 'error')
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
        let area = this.props.area || []
        let position = this.props.position || []
        let role = this.props.role || []
        let getTimeList = this.props.getTimeList || []
        return (
            <View
                getTimeList={getTimeList}
                data={this.props.data}
                position={position}
                area={area}
                onSubmit={this.onSubmit}
                role={role}
                onChangePassword={this.onChangePassword}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        //sử dụng selector để lấy state từ redux
        getTimeList: selector(state, 'user.getTimeList', []),
        lastType: selector(state, "user.lastType", {}),
        error: selector(state, "user.error", ""),
        data: selector(state, "user.item", {}),
        position: selector(state, "position.list.data", []),
        area: selector(state, "area.list.data", []),
        role: selector(state, 'role.list.data', [])
    }
}

export default withRouter(connect(mapStateToProps)(Edit))