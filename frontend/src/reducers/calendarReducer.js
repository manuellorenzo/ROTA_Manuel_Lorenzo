import * as types from '../actions/actionTypes';

const calendarReducer = (state = {
    calendarEvents: []
}, action) => {
    switch (action.type) {
        case types.AUTO_SCHEDULE_CALENDAR:
            console.log("CALENDAR REDUCER -- AUTOSCHEDULE")
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, action.newEvents]
            }
        case types.LOAD_EVENTS_CALENDAR_SUCCESS:
            console.log("CALENDAR REDUCER -- LOAD EVENTS -- ");
            return {
                ...state,
                calendarEvents: action.events.map(item => {
                    return { ...item,
                        start: new Date(item.start),
                        end: new Date(item.end)
                    }
                })
            }
        case types.ADD_ON_CALL_EVENT_SUCCESS:
            console.log('CALENDAR REDUCER -- ADD ON CALL EVENT', state)
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, action.newEvent]
            }
        case types.CHANGE_ON_CALL_EVENT_SUCCESS:
            console.log('CALENDAR REDUCER -- CHANGE ON CALL EVENT', state)
            return {
                ...state,
                calendarEvents: state.calendarEvents.map((item, index) => {
                    if (item._id === action.event._id) {
                        return {
                            ...item,
                            ...action.event
                        };
                    }
                    return item
                })
            }
        case types.REMOVE_ON_CALL_EVENT_SUCCESS:
            console.log('CALENDAR REDUCER -- REMOVE ON CALL EVENT', state)
            return { ...state,
                calendarEvents: state.calendarEvents.filter(item => item._id !== action._id)
            }
        default:
            return state
    }
}

export default calendarReducer