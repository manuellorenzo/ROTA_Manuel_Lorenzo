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
            console.log("CALENDAR REDUCER -- LOAD EVENTS")
            return {
                ...state,
                calendarEvents: action.events
            }
        case types.ADD_ON_CALL_EVENT_SUCCESS:
            console.log('CALENDAR REDUCER -- ADD ON CALL EVENT', state)
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, action.newEvent]
            }
        case 'CHANGE_ONCALL':
            console.log('CHANGE_ONCALL', state)
            return {
                ...state,
                calendarEvents: state.calendarEvents.map((item, index) => {
                    console.log('changeOnCall', action.event._id, item._id)
                    if (item._id === action.event._id) {
                        console.log('change on call if')
                        return {
                            ...item,
                            ...action.event
                        };
                    }
                    return item
                })
            }
        case 'REMOVE_ONCALL':
            console.log('REMOVE_ONCALL', state)
            return { ...state,
                calendarEvents: state.calendarEvents.filter(item => item._id !== action._id)
            }
        default:
            return state
    }
}

export default calendarReducer