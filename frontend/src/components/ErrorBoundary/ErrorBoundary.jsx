import React from 'react'
import { I18n } from 'react-redux-i18n'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info)
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // if(!window.navigator.onLine){
      //   alert(I18n.t('Message.failedRequest'))
      //   return ''
      // } else 
      // {
      //   return <h2>{I18n.t('Message.đã có lỗi xảy ra, xin vui lòng thử lại!')}</h2>
      // }
      return <h2>{I18n.t('Message.SomethingWrong')}</h2>
     
    }

    return this.props.children
  }
}

export default ErrorBoundary