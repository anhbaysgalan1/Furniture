import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import LoadingReducer from './LoadingReducer';
import UtilityReducer from './UtilityReducer';
import UserReducer from './UserReducer';
import BadReducer from './BadReducer';
import GroupReducer from './GroupReducer';
import GoodsReducer from './GoodsReducer'
import OrderReducer from './OrderReducer'

export default combineReducers({
    i18n: i18nReducer,
    loading: LoadingReducer,
    utility: UtilityReducer,
    user: UserReducer,
    bads: BadReducer,
    group: GroupReducer,
    goods: GoodsReducer,
    order: OrderReducer,
})
