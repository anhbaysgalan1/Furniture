import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseField from './BaseField'
import { connectField } from './Connect'
import DateFnsUtils from '@date-io/moment'
import moment from 'moment'
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'
import 'moment/locale/vi'
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarToday from '@material-ui/icons/CalendarToday';
// import WatchIcon from '@material-ui/icons/Watch'
import Icon from '@material-ui/core/Icon';

const debug = require("debug")("mq:form:DateTimeField")
const locale = "vi"
moment.locale(locale)

const styles = theme => ({
})
class DateTimeField extends BaseField {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      value: props.value || null //new Date()
    }
  }
  render() {
    debug("render DatetimeField: ", this.props.name)

    const { onChange, onBlur, margin, defaultValue, error, helperText, name, showDate, showTime, value, ...otherProps } = this.props
    let format = this.props.format
    let Component = DateTimePicker
    if (!showDate && showTime) {
      Component = TimePicker
    }
    else if (!showTime && showDate) {
      Component = DatePicker
      format = 'YYYY/MM/DD'
    }
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
        <Component
          {...otherProps}
          ignoreifempty = 'true'
          name={name}
          format={format}
          error={error ? true : false}
          helperText={helperText}
          ref={ref => this.ref = ref}
          margin={margin || "normal"}
          value={this.state.value? this.state.value : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showTime ? <Icon color="primary">watch_later</Icon> : <CalendarToday color="primary" />}

              </InputAdornment>
            ),
          }}
          onChange={value => this.onChange(value)}
          onBlur={e => this.onBlur(e)}
        />
      </MuiPickersUtilsProvider>
    )
  }
}
DateTimeField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,

  validate: PropTypes.arrayOf(PropTypes.func),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  margin: PropTypes.string,
  showTime: PropTypes.bool,
  showDate: PropTypes.bool,
};

DateTimeField.defaultProps = {
  showTime: true,
  showDate: true
}

export default withStyles(styles)(connectField(DateTimeField))