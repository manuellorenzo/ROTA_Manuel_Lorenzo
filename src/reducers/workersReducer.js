const workersReducer = (state = {
    workers: [],
    onCall: []
}, action) => {
    switch (action.type) {
        case 'ADD_WORKER':
            console.log('ADD_WORKERS', state)
            return {
                ...state,
                workers: [...state.workers, action.worker]
            }
        case 'REMOVE_WORKER':
            const workerId = action;
            console.log('worker.id', workerId)
            return { ...state,
                workers: state.workers.filter(item => item._id !== action._id)
            }
        case 'ADD_ONCALL_WORKER':
            return {
                ...state,
                onCall: [...state.onCall, action.worker]
            }
        case 'REMOVE_ONCALL_WORKER':
            return {
                ...state,
                onCall: state.onCall.filter(item => item._id !== action._id)
            }
        default:
            return state
    }
}

export default workersReducer