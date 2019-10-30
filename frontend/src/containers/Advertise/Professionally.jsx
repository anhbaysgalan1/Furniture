import React from 'react';
import View from 'views/Advertise/Professionally'
import BaseContainer, { selector } from 'containers/BaseContainer';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';

class Professionally extends BaseContainer {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View
            />
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default withRouter(connect(mapStateToProps)(Professionally))