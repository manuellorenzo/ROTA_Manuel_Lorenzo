import * as types from '../actions/actionTypes';

const workersReducer = (state = {
    workers: [],
    onCall: []
}, action) => {
    switch (action.type) {
        case types.LOAD_WORKERS_SUCCESS:
            console.log('ADD_WORKERS', state)
            return {
                ...state,
                workers: action.workers
            }
        case types.EDIT_WORKER_SUCCESS:
            console.log(types.EDIT_WORKER_SUCCESS, state)
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
        case types.ADD_WORKER_SUCCESS:
            console.log('ADD_WORKERS', state)
            return {
                ...state,
                workers: [...state.workers, action.worker]
            }
        case types.DELETE_WORKER_SUCCESS:
            const workerId = action;
            console.log('Delete worker worker.id', workerId)
            return {
                ...state,
                workers: state.workers.map((item, index) => {
                    if (item._id === action.worker._id) {
                        console.log('change worker')
                        return {
                            ...item,
                            inactive: true
                        };
                    }
                    return item
                }),
                onCall: state.onCall.map((item, index) => {
                    if (item._id === action.worker._id) {
                        console.log('change worker')
                        return {
                            ...item,
                            inactive: true
                        };
                    }
                    return item
                })
            }
        default:
            return state
    }
}

export default workersReducer