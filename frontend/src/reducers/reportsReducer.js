const reportsReducer = (state = {
    months: []
}, action) => {
    switch (action.type) {
        case 'ADD_MONTH':
            console.log('ADD_MONTH', state)
            return {
                ...state,
                months: [...state.months, action.month]
            }
        case 'UPDATE_MONTHS':
            return {
                ...state,
                months: action.months
            }
        default:
            return state
    }
}

export default reportsReducer