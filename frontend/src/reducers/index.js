import workersReducer from './workersReducer';
import configurationsReducer from './configurationsReducer';
import reportsReducer from './reportsReducer';
import calendarReducer from './calendarReducer';

import {
  combineReducers
} from 'redux'

export default combineReducers({
  workersReducer,
  configurationsReducer,
  reportsReducer,
  calendarReducer
})