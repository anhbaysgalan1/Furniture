import React from 'react';
import View from 'views/Position/Index'
import PositionAction from '../../actions/PositionAction';
import BaseContainer, { selector } from 'containers/BaseContainer';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class Index extends BaseContainer {
  constructor(props) {
    super(props)
    this.refTable = null
    this.onFetchData = this.onFetchData.bind(this)
    this.onRefTable = this.onRefTable.bind(this)
    this.onDeleteData = this.onDeleteData.bind(this)
  }

  componentDidUpdate(prevProps) {
    //example for check props change
    /* if(prevProps.x !== this.props.x){
      //props x changed
    } */
  }

  onFetchData(state) {
    this.props.dispatch(PositionAction.fetchAll(state))
  }

  componentDidMount(){
    localStorage.setItem('userCalendar', JSON.parse(localStorage.user)._id)
    localStorage.setItem('dateCalendar', new Date())  
  }

  onRefTable(ref) {
    this.refTable = ref
  }

  onDeleteData(selectedIds) {
    this.props.dispatch(PositionAction.delete({
      ids: selectedIds
    }))
      .then(result => {
        if (!result.error) {
          //success
          this.notify(I18n.t('Message.deleteDataSuccess'))
          if (this.refTable) {
            this.refTable.onSelectionChange([])
            this.refTable.onFetchData({currentPage: 0})
          }
        }
        else {
          //error
          // this.notify(`Response: [${result.error.status}] ${result.error.message}`, 'error')
          let err = result.error
          switch (err.status) {
            case 405: {
              if (err.message === "Position_Has_User") {
                this.notify(I18n.t('Backend.Position.Position_Has_User'), 'error')
              }
              break
            }
            case 422: {
              if (err.message === "Id_Required") {
                this.notify(I18n.t("Backend.DbObject.Id_Required"), "error")
              }
              break
            }
            case 404: {
              if (err.message === "No_Object") {
                this.notify(I18n.t("Backend.DbObject.No_Object"), "error")
              }
              break
            }
            default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')

          }
        }
      })

  }

  render() {
    return (<View
      onFetchData={this.onFetchData}
      onRefTable={this.onRefTable}
      onDeleteData={this.onDeleteData}
      data={this.props.data}
    />);
  }
}


const mapStateToProps = state => {
  return {
    data: selector(state, "position.list", {}),
  }
}

export default withRouter(connect(mapStateToProps)(Index))