import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import _ from 'lodash';

class NotistackConsumer extends React.Component {
  handleClick = () => {
    this.props.enqueueSnackbar('I love snacks.');
  };

  handleClickVariant = variant => () => {
    // variant could be success, error, warning or info
    this.props.enqueueSnackbar('This is a warning message!', { variant });
  };
  componentDidUpdate(prevProps) {
    if (this.props.notify) {
      if(_.isEmpty(this.props.notify) || this.props.notify.message.includes('invalid Token') || this.props.notify.message.includes('no msg')) return false
      this.props.enqueueSnackbar(this.props.notify.message, { 
        variant: this.props.notify.type,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        } ,
        autoHideDuration: 2000
      });
    }
  }

  render() {
    return ""
  }
}

NotistackConsumer.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    notify: state.utility.notify
  }
}
NotistackConsumer = withSnackbar(connect(mapStateToProps)(NotistackConsumer));

class Notistack extends React.Component {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>
        <NotistackConsumer />
      </SnackbarProvider>
    )
  }
}
export default Notistack