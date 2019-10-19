import React from 'react';
import View from 'views/Recruiment/Edit'
import RecruimentAction from '../../actions/RecruimentAction';
import BaseContainer, { selector } from 'containers/BaseContainer';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';
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
    // this.props.dispatch(RecruimentAction.fetch({ _id: this.id }))
  }

  // componentWillReceiveProps(nextProps) {
  //   this.handleDataAction(RecruimentAction, "edit", nextProps,{
  //       success: (data) => {
  //         this.notify(I18n.t('Message.editDataSuccess'))
  //         this.goto("/Recruiments")
  //       },
  //       error: (error) => {
  //         this.notify(`Response: [${error.status}] ${error.message}`, 'error')
  //       },
  //   })
  // }

  onSubmit(values) {
    // this.props.dispatch(RecruimentAction.edit({ _id: this.id, ...values }))
    //   .then(data => {
    //     if (!data.error) {
    //       this.notify(I18n.t('Message.editDataSuccess'))
    //       this.goto("/recruiments")
    //     }
    //     else {
    //       let err = data.error
    //       switch (err.status) {
    //         case 400: {
    //           if (err.message === "Recruiment_Code_Exist") {
    //             this.notify(I18n.t('Backend.Recruiment.Recruiment_Code_Exist'), 'error')
    //           }
    //           break
    //         }
    //         case 403: {
    //           if (err.message === "Recruiment_Update_Warning") {
    //             this.notify(I18n.t('Backend.Recruiment.Recruiment_Update_Warning'), 'error')
    //           }
    //           break
    //         }
    //         case 404: {
    //           if (err.message === "No_Object") {
    //             this.notify(I18n.t('Backend.DbObject.No_Object'), 'error')
    //           }
    //           break
    //         }
    //         case 422: {
    //           if (err.message === "Id_Required") {
    //             this.notify(I18n.t('Backend.DbObject.Id_Required'), 'error')
    //           }
    //           break
    //         }
    //         default: this.notify(`Response: [${err.status}] ${err.message}`, 'error')

    //       }
    //     }
    //   })
  }
  render() {
    return (
      <View
        data={this.props.data}
        onSubmit={this.onSubmit}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    //sử dụng selector để lấy state từ redux
    lastType: selector(state, "recruiment.lastType", {}),
    error: selector(state, "recruiment.error", ""),
    data: selector(state, "recruiment.item", {}),
  }
}

export default withRouter(connect(mapStateToProps)(Edit))