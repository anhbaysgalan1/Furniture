import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import LoadingReducer from './LoadingReducer';
import UtilityReducer from './UtilityReducer';
import UserReducer from './UserReducer';
import GroupReducer from './GroupReducer';


export default combineReducers({
  i18n: i18nReducer,
  loading: LoadingReducer,
  utility: UtilityReducer,
  user: UserReducer,
  group: GroupReducer,
});
