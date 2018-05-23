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
            return {
                ...state,
                workers: state.workers.map((item, index) => {
                    if (item._id === action._id) {
                        return {
                            ...item,
                            inactive: true
                        };
                    }
                    return item
                }),
                onCall: state.onCall.map((item, index) => {
                    if (item._id === action._id) {
                        return {
                            ...item,
                            inactive: true
                        };
                    }
                    return item
                })
            }
        case types.LOAD_ON_CALL_WORKERS_SUCCESS:
            console.log('WORKERS REDUCER -- LOAD ON CALL SUCCESS', state)
            return {
                ...state,
                onCall: action.workers
            }
        case types.ADD_TO_ON_CALL_WORKER_SUCCESS:
            return {
                ...state,
                onCall: state.workers.map((item, index) => {
                    if (item._id === action._id) {
                        return {
                            ...item,
                            onCall: true
                        };
                    }
                    return item
                })
            }
        case types.REMOVE_FROM_ON_CALL_WORKER_SUCCESS:
            return {
                ...state,
                onCall: state.workers.map((item, index) => {
                    if (item._id === action._id) {
                        return {
                            ...item,
                            onCall: false
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