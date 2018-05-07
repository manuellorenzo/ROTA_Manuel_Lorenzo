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
                    console.log('item', item)
                    if (item._id === action.event._id) {
                        return {
                            ...item,
                            ...action.event
                        };
                    }
                    return item
                })
            }
        default:
            return state
    }
}

export default calendarReducer