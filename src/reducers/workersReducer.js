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
        case 'UPDATE_WORKER':
            console.log('UPDATE_WORKER', state)
            return {
                ...state,
                workers: state.workers.map((item, index) => {
                    if (item._id === action.worker._id) {
                        console.log('change worker')
                        return {
                            ...item,
                            ...action.worker
                        };
                    }
                    return item
                }),
                onCall: state.onCall.map((item, index) => {
                    if (item._id === action.worker._id) {
                        console.log('change worker')
                        return {
                            ...item,
                            ...action.worker
                        };
                    }
                    return item
                })
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