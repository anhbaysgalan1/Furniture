import React from 'react';
import BaseContainer, { selector } from 'containers/BaseContainer';
import { I18n } from 'react-redux-i18n'
import Login from 'views/Login/Login'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import UserAction from 'actions/UserAction';
import UtilityAction from 'actions/UtilityAction';
// import jwt from 'helpers/jwt'
import jwt_decode from 'jwt-decode'
class LoginContainer extends BaseContainer {
  constructor(props) {
    super(props)
    this.state = {
      error: {
        password: {
          value: undefined,
          modifiedAt: undefined
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const error = this.getData(nextProps, "error", {})
    if (error.status == null) {
      const data = this.getData(nextProps, "data") // token
      const dataInToken = jwt_decode(data.token)
      localStorage.clear()
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(dataInToken))
      this.props.history.push("/")
    }
    else if (error.status === 401) {
      if (error.message !== "invalid Token") {
        this.setFieldError("password", I18n.t("Form.incorrectPassword"))
      }

    }
    else {
      // this.props.dispatch(UtilityAction.notify({
      //   message: `Response: [${error.status}] ${error.message}`,
      //   type: "error"
      // }))
    }
    this.state.modifiedAt = new Date(0)
  }

  onSubmit(values) {
    this.props.dispatch(UserAction.login(values))
  }

  render() {
    return <Login
      onSubmit={values => this.onSubmit(values)}
      error={this.state.error}
    />
  }
}

const mapStateToProps = state => {
  return {
    isLoading: selector(state, "user.isLoading", false),
    error: selector(state, "user.error", ""),
    data: selector(state, "user.data", {}),
  }
}

export default withRouter(connect(mapStateToProps)(LoginContainer))