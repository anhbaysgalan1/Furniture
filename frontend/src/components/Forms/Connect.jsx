import React from 'react'
import PropTypes from 'prop-types'

const debug = require("debug")("mq:form:Connect")
const FormContext = React.createContext()
/**
 * Class chức năng của form
 * sử dụng để tạo ra sự liên kết giữa form và các input trong form
 * sử dụng Provider vs Consumer để truyền dữ liệu.
 */
class FormProvider extends React.Component {
  constructor(props) {
    super(props)
    this.registedField = {} //các field đã đăng ký
    props.form.provider = this
  }

  /**
   * Đăng ký field với form
   */
  registerField(fieldName, field) {
    debug("registerField", fieldName)
    this.registedField[fieldName] = field
  }

  render() {
    return (
      <FormContext.Provider
        value={{
          registerField: this.registerField.bind(this),
          registedField: this.registedField
        }}
      >
        {this.props.children}
      </FormContext.Provider>
    )
  }
}

class FormConsumer extends React.Component {
  render() {
    const { children, name } = this.props
    return (
      <FormContext.Consumer>
        {({ registedField, registerField } = {}) =>
          React.Children.map(children, child =>
            React.cloneElement(child, {
              ref: ref => {
                if (!registedField || !registerField) return
                registerField(name, ref)
              }
            })
          )
        }
      </FormContext.Consumer>
    )
  }
}

/**
 * Sử dụng hàm này để kết nối các input với form, sử dụng Provider vs Consumer để truyền dữ liệu trong form
 */
const connectField = (Component) => (props) => {
  const { ...otherProps } = props
  return (
    <FormConsumer name={props.name}>
      <Component {...otherProps} />
    </FormConsumer>
  )
}

FormProvider.propTypes = {
  form: PropTypes.object.isRequired
}

FormConsumer.propTypes = {
  name: PropTypes.string.isRequired
}

export {
  FormProvider,
  FormConsumer,
  connectField
}
