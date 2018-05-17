import workersReducer from './workersReducer';
import compensationsReducer from './compensationsReducer';
import reportsReducer from './reportsReducer';
import calendarReducer from './calendarReducer';

import {
  combineReducers
} from 'redux'

export default combineReducers({
  workersReducer,
  compensationsReducer,
  reportsReducer,
  calendarReducer
})