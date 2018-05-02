const workers = (state = [], action) => {
    switch (action.type) {
        case 'ADD_WORKER':
            return [
                ...state,
                {
                    worker: action.worker
                }
            ]
        case 'REMOVE_WORKER':
            return state.filter(({ id }) => id !== action.worker.id);
        default:
            return state
    }
}

export default workers