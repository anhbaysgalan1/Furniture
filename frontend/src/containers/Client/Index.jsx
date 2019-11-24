import React from 'react'
import View from 'views/Client/Index'
import ClientAction from '../../actions/ClientAction'
import GoodsAction from '../../actions/GoodsAction'
import UserAction from '../../actions/UserAction'
import PostsAction from '../../actions/PostsAction'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
   constructor(props) {
      super(props)
      this.refTable = null
      this.onFetchData = this.onFetchData.bind(this)
      this.onRefTable = this.onRefTable.bind(this)
      this.onDeleteData = this.onDeleteData.bind(this)
   }

   componentDidMount() {
      this.props.dispatch(ClientAction.fetchAll({ pageSize: -1 }))
      this.props.dispatch(GoodsAction.fetchAll({ pageSize: -1 }))
   }

   onFetchData(state) {
      this.props.dispatch(ClientAction.fetchAll(state))
   }

   onRefTable(ref) {
      this.refTable = ref
   }

   onDeleteData(selectedIds) {
      this.props.dispatch(ClientAction.delete({
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
               onFetchData={this.onFetchData}
               onRefTable={this.onRefTable}
               onDeleteData={this.onDeleteData}
               data={this.props.data}
               goods={this.props.goods}

            />
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      data: selector(state, "client.list", {}),
      goods: selector(state, "goods.list.data", []),
   }
}

export default withRouter(connect(mapStateToProps)(Index))