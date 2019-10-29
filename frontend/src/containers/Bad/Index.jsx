import React from 'react';
import View from 'views/Bad/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import BadAction from '../../actions/BadAction'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';

class Index extends BaseContainer {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.props.dispatch(BadAction.fetchAll({ pageSize: -1 }))
    }
    render() {
        return (
            <View />
        )
    }
}

const mapStateToProps = state => {
    console.log("state",state)
    return {
    }
}

export default withRouter(connect(mapStateToProps)(Index))