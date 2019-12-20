import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { I18n } from 'react-redux-i18n'

class ConfirmDialog extends React.Component {
  constructor(){
    super()
    this.state = {
      open: false,
    }
    this.onCancel = this.onCancel.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }


  show(data = null){
    this.setState({
      open: true,
      data: data
    })
  }
  hide(){
    this.setState({
      open: false
    })
  }
  onCancel(){
    const {onCancel} = this.props
    this.hide()
    if(typeof onCancel === "function"){
      onCancel(this.state.data)
    }
  }

  onSubmit(){
    const {onSubmit} = this.props
    if(typeof onSubmit === "function"){
      onSubmit(this.state.data)
    }
    this.hide()
  }

  render() {
    let {title, content, textCancel, textSubmit} = this.props
    title   = title || ""
    content = content || ""
    textCancel = textCancel || I18n.t('ComfirmDialog.cancel')
    textSubmit  = textSubmit || "OK"

    return (
        <Dialog
          open={this.state.open}
          onClose={this.onCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
              {content}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onCancel} color="primary">
              {textCancel}
            </Button>
            <Button onClick={this.onSubmit} color="primary" autoFocus>
              {textSubmit}
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default ConfirmDialog