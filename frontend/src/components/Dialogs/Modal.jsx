import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Modal extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: props.open || false,
    };
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


  render() {
    let {title, content, children} = this.props
    title   = title || ""
    content = content || ""
    if (typeof content === "function") content = content({...this.props, ...this.state.data})
    return (
        <Dialog
          open={this.state.open}
          onClose={this.onCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
              {children}
              {content}
          </DialogContent>
        </Dialog>
    );
  }
}

export default Modal;