import { combineReducers } from 'redux'
import { i18nReducer } from 'react-redux-i18n'
import LoadingReducer from './LoadingReducer'
import UtilityReducer from './UtilityReducer'
import UserReducer from './UserReducer'
import BadReducer from './BadReducer'
import GroupReducer from './GroupReducer'
import GoodsReducer from './GoodsReducer'
import PostsReducer from './PostsReducer'
import ClientReducer from './ClientReducer'
import OrderReducer from './OrderReducer'
import FinanceReducer from './FinanceReducer'
import ContactReducer from './ContactReducer'

export default combineReducers({
    i18n    : i18nReducer,
    loading : LoadingReducer,
    utility : UtilityReducer,
    user    : UserReducer,
    bads    : BadReducer,
    goods   : GoodsReducer,
    group   : GroupReducer,
    posts   : PostsReducer,
    client  : ClientReducer,
    order   : OrderReducer,
    contact : ContactReducer,
    finance : FinanceReducer,
})
