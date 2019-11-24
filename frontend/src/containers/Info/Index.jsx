import React from 'react'
import View from 'views/Info/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import { withRouter } from 'react-router-dom'
import PostsAction from '../../actions/PostsAction'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

class Index extends BaseContainer {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(PostsAction.fetchAll({ pageSize: -1 }))
    }

    render() {
        return (
            <View
                posts={this.props.posts}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: selector(state, "posts.list.data", []),
    }
}

export default withRouter(connect(mapStateToProps)(Index))