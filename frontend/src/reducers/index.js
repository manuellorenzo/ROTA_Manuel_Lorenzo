import workersReducer from './workersReducer';
import configurationsReducer from './configurationsReducer';
import reportsReducer from './reportsReducer';
import calendarReducer from './calendarReducer';
import compensationsReducer from'./compensationsReducer';
import loginReducer from './loginReducer';

import {
  combineReducers
} from 'redux'

export default combineReducers({
  workersReducer,
  configurationsReducer,
  reportsReducer,
  calendarReducer,
  compensationsReducer,
  loginReducer
})