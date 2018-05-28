import * as types from './actionTypes';
import calendarApi from '../api/calendarApi';

export function autoSchedule(start, end) {
  console.log("CALENDAR ACTIONS -- AUTO SCHEDULE -- ", start, "END ", end)
  return function (dispatch) {
    return calendarApi.autoSchedule(start, end).then(response => {
      if (response.status === 201) {
        dispatch(autoScheduleSuccess(start, end, response.data));
      } else {
        console.log("CALENDAR ACTIONS -- ERROR AUTOSCHEDULE -- ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function autoScheduleSuccess(start, end, newEvents) {
  console.log("CALENDAR ACTIONS -- AUTOSCHEDULE SUCCESS", newEvents)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    start,
    end,
    newEvents
  };
}

export function loadEvents() {
  console.log("CALENDAR ACTIONS -- LOAD EVENTS -- ")
  return function (dispatch) {
    return calendarApi.loadEvents().then(response => {
      if (response.status === 200) {
        dispatch(loadEventsSuccess(response.data));
      } else if (response.status === 404) {
        console.log("CALENDAR ACTIONS -- LOAD EVENTS 404 -- ", response)
        dispatch(loadEventsSuccess([]));
      } else {
        console.log("CALENDAR ACTIONS -- LOAD EVENTS ERROR -- ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function loadEventsSuccess(events) {
  console.log("CALENDAR ACTIONS -- LOAD EVENTS SUCCESS", events)
  return {
    type: types.LOAD_EVENTS_CALENDAR_SUCCESS,
    events
  };
}

export function addOnCallEvent(newEvent) {
  console.log("CALENDAR ACTIONS -- ADD ON CALL EVENT -- ", newEvent);
  return function (dispatch) {
    return calendarApi.addOnCallEvent(newEvent).then(response => {
      if (response.status === 200) {
        dispatch(addOnCallEventSuccess(response.data));
      }else {
        console.log("CALENDAR ACTIONS -- ADD ON CALL EVENT ERROR -- ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function addOnCallEventSuccess(newEvent) {
  console.log("CALENDAR ACTIONS -- ADD ON CALL EVENT SUCCESS", newEvent)
  return {
    type: types.ADD_ON_CALL_EVENT_SUCCESS,
    newEvent
  };
}

export const changeOnCall = event => ({
  type: 'CHANGE_ONCALL',
  event
})
export const removeOnCall = _id => ({
  type: 'REMOVE_ONCALL',
  _id
})

export const addWorkerToReport = worker => ({
  type: 'ADD_WORKER',
  worker
})