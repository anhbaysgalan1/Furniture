import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './layouts/Login'
import Main from './layouts/Main'
import withRoot from './withRoot'
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary'

class Routes extends React.Component {
  checkJWTToken() {
    try {
      let token = localStorage.getItem('token')
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      let decodedToken = JSON.parse(window.atob(base64));
      var dateNow = new Date();
      let user = localStorage.getItem('user')
      // if (decodedToken.exp && decodedToken.exp < dateNow.getTime())
        //return false
      if (user) return true 
      return false
    } catch (e) {
      //return false;
    }
    return false
  }
  render() {
    return (
      <ErrorBoundary>
          <BrowserRouter>
            <Switch>
              <Route path="/admin" name="Login Page" component={Login} />
              <Route path="/" render={(props) => (
                this.checkJWTToken()
                  ? (<Main {...props} />)
                  : (<Redirect to={{
                    pathname: '/admin',
                    state: {
                      from: props.location
                    }
                  }} />))} />
            </Switch>
          </BrowserRouter>
      </ErrorBoundary>
    )
  }
}
export default withRoot(Routes)