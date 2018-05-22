const calendarReducer = (state = {
    calendarEvents: []
}, action) => {
    switch (action.type) {
        case 'ADD_ONCALL':
            console.log('ADD_ONCALL', state)
            return {
                ...state,
                calendarEvents: [...state.calendarEvents, action.event]
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