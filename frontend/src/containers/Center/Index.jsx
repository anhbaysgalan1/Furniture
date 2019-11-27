import React from 'react'
import View from 'views/Center/Index'
import BaseContainer, { selector } from 'containers/BaseContainer'
import GoodsAction from '../../actions/GoodsAction'
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
      this.props.dispatch(GoodsAction.getBadByType({ typeGoods: '0' }))
   }

   render() {
      return (
         <View
            posts={this.props.posts}
            goods={this.props.goods}
         />
      )
   }
}

const mapStateToProps = state => {
   return {
      posts: selector(state, "posts.list.data", []),
      goods: selector(state, "goods.getBadByType", [])
   }
}

export default withRouter(connect(mapStateToProps)(Index))