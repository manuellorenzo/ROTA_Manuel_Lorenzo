import * as types from './actionTypes';
import calendarApi from '../api/calendarApi';

export function autoSchedule(start, end, overwrite) {
  console.log("CALENDAR ACTIONS -- AUTO SCHEDULE -- ", start, "END ", end, "OVERWRITE",overwrite)
  return function (dispatch) {
    return calendarApi.autoSchedule(start, end, overwrite).then(response => {
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

export function findEventsByWorker(workerId){
  return function (dispatch){
    return calendarApi.findEventsByWorker(workerId).then(eventsWorker=>{
        return eventsWorker;
    }).catch(error=>{
        throw (error);
    })
  }
}

/*export function findEventByWorkerSuccess(eventsWorker){
  return{
    type:types.FIND_EVENTS_BY_WORKER_SUCCESS,
    eventsWorker
  }
}*/

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

export function changeOnCallEvent(newEvent) {
  console.log("CALENDAR ACTIONS -- CHANGE ON CALL EVENT -- ", newEvent);
  return function (dispatch) {
    return calendarApi.changeOnCallEvent(newEvent).then(response => {
      if (response.status === 201) {
        dispatch(changeOnCallEventSuccess(response.data));
      }else {
        console.log("CALENDAR ACTIONS -- CHANGE ON CALL EVENT ERROR -- ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export const changeOnCallEventSuccess = event => ({
  type: types.CHANGE_ON_CALL_EVENT_SUCCESS,
  event
});

export function removeOnCallEvent(_id) {
  console.log("CALENDAR ACTIONS -- REMOVE ON CALL EVENT -- ", _id);
  return function (dispatch) {
    return calendarApi.removeOnCallEvent(_id).then(response => {
      if (response.status === 200) {
        dispatch(removeOnCallSuccess(response.data));
      }else {
        console.log("CALENDAR ACTIONS -- CHANGE ON CALL EVENT ERROR -- ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export const removeOnCallSuccess = _id => ({
  type: types.REMOVE_ON_CALL_EVENT_SUCCESS,
  _id
})
