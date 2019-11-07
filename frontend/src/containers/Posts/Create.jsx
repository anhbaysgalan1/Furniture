import React from 'react'
import View from 'views/Posts/Create'
import PostsAction from  '../../actions/PostsAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
        this.state = {
            permission: []
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
    }

    componentDidMount() {
        // this.props.dispatch(PermissionAction.fetchAll({ pageSize: -1 }))
    }

    onSubmit(values) {
        console.log('values', values)
        // this.props.dispatch(PostsAction.create(values))
        //     .then(data => {
        //         if (!data.error) {
        //             this.notify(I18n.t('Message.createDataSuccess'))
        //             this.goto("/posts/create")
        //         }
        //         else {
        //             let err = data.error
        //             switch (err.status) {
        //                 case 400: {
        //                     if (err.message === "Role_Name_Exist") {
        //                         this.notify(I18n.t('Backend.Role.Role_Name_Exist'), 'error')
        //                     }
        //                     break
        //                 }
        //                 case 404: {
        //                     if (err.message === "Permission_Not_Exist") {
        //                         this.notify(I18n.t('Backend.Role.Permission_Not_Exist'), 'error')
        //                     }
        //                     break
        //                 }
        //                 default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')
        //             }
        //         }
        //     })
    }

    render() {
        return (
            <View
                onSubmit={this.onSubmit}
                permission={this.props.permission}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        data: selector(state, "role.data", {}),
        permission: selector(state, "permission.list.data", []),
    }
}

export default withRouter(connect(mapStateToProps)(Index))