const workers = (state = {
    workers: []
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
                workers: state.workers.filter(item => item.id !== action.id)
            }
        default:
            return state
    }
}

export default workers