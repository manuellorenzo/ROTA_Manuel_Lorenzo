import workersReducer from './workersReducer';
import compensationsReducer from './compensationsReducer';

import {
  combineReducers
} from 'redux'

export default combineReducers({
  workersReducer,
  compensationsReducer
})