import BaseReducer from './BaseReducer'
class PostsReducer extends BaseReducer {
  get actionsAllow() {
    return {
      ...super.actionsAllow,
      "Posts.login": {
        path: "data"
      },
      "Posts.create": {
        path: "data"
      },
      "Posts.edit": {
        path: "data"
      },
      "Posts.fetchAll": {
        path: "list"
      },
      "Posts.fetch": {
        path: "item"
      },
      "Posts.delete": {
        path: "data"
      },
      "Posts.destroy": {
        path: "data"
      },
      "Posts.getApprover": {
        path: "data.getApprover"
      },
      "Posts.updateLineToken": {
        path: "data.updateLineToken"
      },
      "Posts.getTimeList": {
        path: "getTimeList"
      },
    }
  }

  get initialState() {
    return {
      ...super.initialState,
      error: {
        message: null
      }
    }
  }
}
/**
 * bắt buộc gọi hàm export()
 */
export default PostsReducer.export()