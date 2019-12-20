import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store'

import LoadModules from './loadModules'
import * as serviceWorker from './serviceWorker'
// These must be the first lines in src/index.js
// import 'react-app-polyfill/ie11'
// import 'react-app-polyfill/stable'
// import 'url-search-params-polyfill'

const { store } = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <LoadModules />
  </Provider>,
  document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
if (module.hot) {
  module.hot.accept('./loadModules', () => {
    ReactDOM.render(
      <Provider store={store}>
        <LoadModules />
      </Provider>,
      document.getElementById('root'))
  })
}