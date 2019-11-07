import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import BaseField from './BaseField'
import { connectField } from './Connect'
import moment from 'moment'
import * as myLocale from 'react-date-range/dist/locale'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange, DateRangePicker } from 'react-date-range'
import TextField from '@material-ui/core/TextField'
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  withMobileDialog,
  Button
} from '@material-ui/core'
import { I18n } from 'react-redux-i18n'
const debug = require("debug")("mq:form:DateTimeRangeField")

const styles = theme => ({
  dialogContent: {
    margin: "auto"
  },
  calendarWrapper: {
  }
})
class DateRangeField extends BaseField {
  constructor(props) {
    super(props)
    let value = {
      startDate: undefined,
      endDate: undefined,
      key: "dateRange"
    }
    if (props.value) value = props.value
    else if (props.defaultValue) value = props.defaultValue
    if (typeof value.startDate === "string") value.startDate = new Date(value.startDate)
    if (typeof value.endDate === "string") value.endDate = new Date(value.endDate)
    this.state = {
      ...this.state,
      value: value,
      openDialog: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleClearValue = this.handleClearValue.bind(this)
    this.onChangeDateField = this.onChangeDateField.bind(this)
  }

  setDefaultValue(defaultValue, modifiedAt) {
    if (defaultValue.startDate) defaultValue.startDate = new Date(defaultValue.startDate)
    if (defaultValue.endDate) defaultValue.endDate = new Date(defaultValue.endDate)
    this.setState({
      defaultValue: defaultValue,
      [this.valueField]: defaultValue,
      modifiedAt: {
        ...this.state.modifiedAt,
        defaultValue: modifiedAt
      }
    }, () => {
      this.onValidate()
    })
  }
  getKey() {
    return this.state.value.key || "ranger1"
  }
  //hiển thị diaLog chọn thời gian
  handleClickOpen() {
    if (this.props.disabled === true) return;
    this.setState({ openDialog: true })
  }
  //đóng dialog thì đồng thời gọi callback onChange
  handleCloseDialog() {
    this.setState({ openDialog: false })
    this.onChange(this.getValue())
  }
  //clear value đã chọn
  handleClearValue() {
    this.onChangeDateField({
      [this.getKey()]: {
        startDate: undefined,
        endDate: undefined,
      }
    })
  }
  //khi chọn date thì thay đổi giá trị state (lúc này chưa gọi callback onChange ra component cha)
  onChangeDateField(newValue) {
    this.setState({
      value: {
        ...this.state.value,
        ...newValue[this.getKey()]
      }
    })
  }

  /**
   * Render input đại diện cho Date Range
   */
  renderTextField() {
    const { inputProps, formater, format, disabled, placeholder, label } = this.props
    let { value } = this.state
    let startDate, endDate = undefined

    //format lại dữ liệu hiển thị ra input
    if (formater) value = formater(value)
    else {
      let formatDate = format || undefined
      startDate = value.startDate ? moment(value.startDate).format(formatDate) : undefined
      endDate = value.endDate ? moment(value.endDate).format(formatDate) : undefined
    }

    let textValue = ""
    if (startDate && endDate) {
      textValue = `${startDate} - ${endDate}`
    }
    return (
      <TextField
        disabled={disabled}
        fullWidth
        value={textValue}
        label={label || ''}
        placeholder={placeholder || I18n.t("Input.filterDate")}
        {...inputProps}
        onClick={this.handleClickOpen}
      />
    )
  }

  /**
   * Render bộ chọn date
   */
  renderDateRangePicker() {
    const { value } = this.state
    const { onChange, onBlur, fullScreen, classes, width, jaLocale, ...otherProps } = this.props
    // let DateComponent = DateRangePicker
    //tính toán việc hiển thị khi responsive cho hợp lý.
    // if (fullScreen === true) DateComponent = DateRange
    let months = 2, direction = 'horizontal', scrollEnabled = false;
    if (width === 'xs') {
      direction = "vertical"
      scrollEnabled = true
    }
    let checkLocale = I18n.t("Form.checkLocale")
    let changeLocale
    switch (checkLocale) {
      case "vi":
        changeLocale = myLocale.vi
        break;
      case "ja":
        changeLocale = myLocale.ja
        break;
      default: changeLocale = myLocale.ja
        break;
    }
    return (
      <DateRange
        locale={changeLocale}
        scroll={{
          enabled: scrollEnabled,
        }}
        className={classes.calendarWrapper}
        months={months}
        direction={direction}
        {...otherProps}
        ranges={[value]}
        onChange={this.onChangeDateField}
        onBlur={this.onChangeDateField}
      />
    )
  }

  /**
   * Render hộp dialog
   */
  renderDialog() {
    let { fullScreen, dialogProps, classes } = this.props
    dialogProps = dialogProps || {}
    return (
      <Dialog
        maxWidth={false}
        fullScreen={fullScreen}
        open={this.state.openDialog}
        onClose={this.handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
        {...dialogProps}
      >
        {/* <DialogTitle id="responsive-dialog-title">
          {dialogProps.title || I18n.t("Input.filterDate")}
        </DialogTitle> */}
        <DialogContent className={classes.dialogContent}>
          {this.renderDateRangePicker()}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClearValue} color="primary">
            {I18n.t("Form.buttonClear")}
          </Button>
          <Button onClick={this.handleCloseDialog} color="primary" autoFocus>
            {I18n.t("Form.buttonOK")}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }


  render() {
    debug("render DatetimeRangerField: ", this.props.name)
    return (
      <div>
        {this.renderTextField()}
        {this.renderDialog()}
      </div>
    )
  }
}
DateRangeField.propTypes = {
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

//withMobileDialog để tính toán responsive cho dialog
export default withStyles(styles)(withMobileDialog({ breakpoint: 'sm' })(connectField(DateRangeField)))