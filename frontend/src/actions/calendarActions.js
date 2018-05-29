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

export function findEventByWorker(workerId){
  return function (dispatch){
    return calendarApi.findEventByWorker(workerId).then(eventsWorker=>{
        dispatch(findEventByWorkerSuccess(eventsWorker))
    }).catch(error=>{
        throw (error);
    })
  }
}

export function findEventByWorkerSuccess(eventsWorker){
  return{
    type:types.FIND_EVENTS_BY_WORKER_SUCCESS,
    eventsWorker
  }
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

export const addOnCall = event => ({
  type: 'ADD_ONCALL',
  event
})

export const changeOnCall = event => ({
  type: 'CHANGE_ONCALL',
  event
})
export const removeOnCall = _id => ({
  type: 'REMOVE_ONCALL',
  _id
})

