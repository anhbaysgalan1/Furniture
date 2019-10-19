import React from 'react'
import View from 'views/User/Create'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserAction from '../../actions/UserAction'
import PositionAction from '../../actions/PositionAction'
import AreaAction from '../../actions/AreaAction'
import RoleAction from '../../actions/RoleAction'
import { I18n } from 'react-redux-i18n'
import { number } from 'prop-types'
import _ from 'lodash'
import { stat } from 'fs'

class Create extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
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
            timeId: values.timeId,
            joiningDate: values.joiningDate,
            name: values.name,
            password: values.password,
            rePassword: values.rePassword,
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
        this.props.dispatch(UserAction.create(dataFormat))
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
                getTimeList={this.props.getTimeList}
                position={this.props.position}
                area={this.props.area}
                onSubmit={this.onSubmit}
                role={this.props.role}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        getTimeList: selector(state, 'user.getTimeList', []),
        data: selector(state, "user.list", {}),
        position: selector(state, "position.list.data", []),
        area: selector(state, "area.list.data", []),
        role: selector(state, "role.list.data", [])
    }
}

export default withRouter(connect(mapStateToProps)(Create))