import React from 'react';
import View from 'views/Recruiment/Index'
import RecruimentAction from '../../actions/RecruimentAction';
import BaseContainer, { selector } from 'containers/BaseContainer';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';
/**
 * Files are automatically generated from the template.
 * MQ Solutions 2019
 */
class Index extends BaseContainer {
  constructor(props) {
    super(props)
    this.refTable = null
    this.onFetchData = this.onFetchData.bind(this)
    this.onRefTable = this.onRefTable.bind(this)
    this.onDeleteData = this.onDeleteData.bind(this)
  }

  componentWillReceiveProps(nextProps) {
  }

  onFetchData(state) {
  }

  onRefTable(ref) {
    this.refTable = ref
  }

  onDeleteData(selectedIds) {
  }

  render() {
    return (<View
      onFetchData={this.onFetchData}
      onRefTable={this.onRefTable}
      onDeleteData={this.onDeleteData}
      data={this.props.data}
    />);
  }
}


const mapStateToProps = state => {
  return {
    lastType: selector(state, "recruiment.lastType", {}), //bắt buộc sử dụng để handle Data Action
    data: selector(state, "recruiment.list", {}),
    error: selector(state, "recruiment.error", ""),
  }
}

export default withRouter(connect(mapStateToProps)(Index))