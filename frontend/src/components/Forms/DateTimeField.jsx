import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseField from './BaseField'
import { connectField } from './Connect'
import DateFnsUtils from '@date-io/moment'
import MomentUtils from '@date-io/moment'
import moment from 'moment'
import { I18n } from 'react-redux-i18n'
import 'moment/locale/ja'
import { MuiPickersUtilsProvider, TimePicker, DatePicker, DateTimePicker } from 'material-ui-pickers'
import InputAdornment from '@material-ui/core/InputAdornment'
import CalendarToday from '@material-ui/icons/CalendarToday'
// import WatchIcon from '@material-ui/icons/Watch'
import Icon from '@material-ui/core/Icon'

const debug = require("debug")("mq:form:DateTimeField")

const styles = theme => ({
})
class LocalizedUtils extends DateFnsUtils {
   getDatePickerHeaderText(date) {
      return moment(date).locale(I18n.t("DateTimeField.locale")).format('ll')
   }
   getMeridiemText(hour) {
      return "am" === hour ? I18n.t("DateTimeField.AM") : I18n.t("DateTimeField.PM")
   }
   getCalendarHeaderText(date) {
      return moment(date).locale(I18n.t("DateTimeField.locale")).format('YYYY' + I18n.t("DateTimeField.year") + 'MMM')
   }
}

class DateTimeField extends BaseField {
   constructor(props) {
      super(props)
      this.state = {
         ...this.state,
         value: props.value || null //new Date()
      }
   }
   render() {
      let locale = I18n.t("DateTimeField.locale")
      moment.locale(locale)
      debug("render DatetimeField: ", this.props.name)
      const { onBlur, margin, defaultValue, name, showDate, showTime, value, ...otherProps } = this.props
      let format = this.props.format
      let Component = DateTimePicker
      if (!showDate && showTime) {
         Component = TimePicker
      }
      else if (!showTime && showDate) {
         Component = DatePicker
         format = 'YYYY/MM/DD'
      }
      // debugger
      return (
         <MuiPickersUtilsProvider utils={LocalizedUtils}>
            <Component
               {...otherProps}
               ignoreifempty='true'
               name={name}
               format={format}
               error={this.state.error ? true : false}
               helperText={this.state.error}
               ref={ref => this.ref = ref}
               margin={margin || "normal"}
               value={this.state.value ? this.state.value : null}
               cancelLabel={I18n.t("DateTimeField.cancel")}
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
}

DateTimeField.defaultProps = {
   showTime: true,
   showDate: true
}

export default withStyles(styles)(connectField(DateTimeField))