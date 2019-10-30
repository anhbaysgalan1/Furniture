import React from 'react';
import View from 'views/Bad/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n';

class Index extends BaseContainer {
    constructor(props) {
        super(props)
    }

    componentWillMount(){
    }
    
    render() {
        return (
            <div>
                <View />
            </div>
         
        )
    }
}

const mapStateToProps = state => {
    console.log("state",state)
    return {
    }
}

export default withRouter(connect(mapStateToProps)(Index))