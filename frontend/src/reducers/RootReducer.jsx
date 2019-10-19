import { combineReducers } from 'redux';
import { i18nReducer } from 'react-redux-i18n';
import LoadingReducer from './LoadingReducer';
import UtilityReducer from './UtilityReducer';
import UserReducer from './UserReducer';
import GroupReducer from './GroupReducer';
import AreaReducer from './AreaReducer';
import RoleReducer from './RoleReducer';
import PermissionReducer from './PermissionReducer';
import PositionReducer from './PositionReducer';
import SettingReducer from './SettingReducer';
import ConstructionReducer from './ConstructionReducer';
import LaborReducer from './LaborReducer';
import HistoryReducer from './HistoryReducer';
import WorkerReducer from './WorkerReducer';
import RequestReducer from './RequestReducer';
import HourReducer from './HourReducer';
import CalendarReducer from './CalendarReducer';
import TimekeepingReducer from './TimekeepingReducer';
import ContentsReducer from './ContentsReducer';
/*__AUTOIMPORTREDUCER__*/
/*Do not remove  __AUTOIMPORTREDUCER__ variable.*/

export default combineReducers({
  i18n: i18nReducer,
  loading: LoadingReducer,
  utility: UtilityReducer,
  user: UserReducer,
  group: GroupReducer,
  area: AreaReducer,
  role: RoleReducer,
  permission: PermissionReducer,
  position: PositionReducer,
  setting: SettingReducer,
  construction: ConstructionReducer,
  labor: LaborReducer,
  history: HistoryReducer,
  worker: WorkerReducer,
  request: RequestReducer,
  hour: HourReducer,
  calendar: CalendarReducer,
  timekeeping: TimekeepingReducer,
  contents: ContentsReducer,
  /*__AUTOREDUCER__*/
  /*Do not remove  __AUTOREDUCER__ variable.*/
});
