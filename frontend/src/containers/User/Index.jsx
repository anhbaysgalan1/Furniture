import React from 'react'
import View from 'views/User/Index'
import UserAction from '../../actions/UserAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { stat } from 'fs'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
        this.refTable = null
        this.onFetchData = this.onFetchData.bind(this)
        this.onRefTable = this.onRefTable.bind(this)
        this.onDeleteData = this.onDeleteData.bind(this)
    }

    onRefTable(ref){
        this.refTable = ref
    }

    onFetchData(state) {
        this.props.dispatch(UserAction.fetchAll(state))
    }

    componentDidMount(){
        localStorage.setItem('userCalendar', JSON.parse(localStorage.user)._id)
        localStorage.setItem('dateCalendar', new Date()) 
    }

    onDeleteData(selectedIds){
        this.props.dispatch(UserAction.delete({ ids: selectedIds }))
        .then(result => {
            if(!result.error){
                // success
                this.notify(I18n.t('Message.deleteDataSuccess'))
                if(this.refTable) {
                    this.refTable.onSelectionChange([])
                    this.refTable.onFetchData({currentPage: 0})
                }
            } else {
                // error
                let err = result.error
                switch (err.status) {
                    case 404:{
                        if (err.message === "No_Object") {
                            this.notify(I18n.t('Backend.DbObject.No_Object'), 'error')
                        }
                        break
                    }
                    case 405:{
                        if (err.message === "Del_User_Warn") {
                            this.notify(I18n.t('Backend.User.Del_User_Warn'), 'error')
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
            <View
                onRefTable = {this.onRefTable}
                onFetchData = {this.onFetchData}
                data={this.props.data}
                onDeleteData = {this.onDeleteData}
            />
        )
    }
}

const mapStateToProps = state => {
  return {
    data: selector(state, "user.list", {}),
  }
}

export default withRouter(connect(mapStateToProps)(Index))