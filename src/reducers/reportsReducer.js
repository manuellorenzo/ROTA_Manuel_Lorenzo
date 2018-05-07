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
        default:
            return state
    }
}

export default reportsReducer