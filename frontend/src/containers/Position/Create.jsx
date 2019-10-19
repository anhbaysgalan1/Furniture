import React from 'react';
import View from 'views/Position/Create'
import PositionAction from '../../actions/PositionAction';
import BaseContainer, { selector } from 'containers/BaseContainer';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import _ from 'lodash'
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class Create extends BaseContainer {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    formatData(values) {
        let remuneration = _.get(values, 'remuneration', '')
        remuneration = remuneration.replace(/,/g, '')
        let converData = {
            code: values.code,
            name: values.name,
            remuneration: Number(remuneration)
        }
        return converData
    }


    onSubmit(values = {}) {
        // let converData = this.formatData(values)
        this.props.dispatch(PositionAction.create(values))
            .then(data => {
                if (!data.error) {
                    this.notify(I18n.t('Message.createDataSuccess'))
                    this.goto("/positions")
                } else {
                    // this.notify(`Response: [${data.error.status}] ${data.error.message}`, 'error')
                    let err = data.error
                    switch (err.status) {
                        case 400: {
                            if (err.message === "Position_Code_Exist") {
                                this.notify(I18n.t("Backend.Position.Position_Code_Exist"), "error")
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
        //sử dụng selector để lấy state từ redux
        data: selector(state, "position.data", {}),
    }
}

export default withRouter(connect(mapStateToProps)(Create))