import compensationApi from '../api/CompensationApi';
import * as types from './actionTypes';


export function loadAllCompensations() {
    return function (dispatch) {
        return compensationApi.getAllCompensations().then(allCompensations => {
            dispatch(loadAllCompensationSuccess(allCompensations));
        }).catch(error => {
            throw (error);
        });
    };
}

export function loadAllCompensationSuccess(allCompensations) {
    return {
        type: types.LOAD_COMPENSATIONS_SUCCESS,
        allCompensations
    }
}


export function loadCompensationByWorker(_id) {
    return function (dispatch) {
        return compensationApi.findCompensationByWorker(_id).then(compensations => {
            dispatch(loadCompensationByWorkerSuccess(compensations))
        }).catch(error => {
            throw (error);
        })
    }
}

export function loadCompensationByWorkerSuccess(compensations) {
    return {
        type: types.ADD_COMPENSATION_BY_WORKER,
        compensations
    }
}

export function getCompensationById(_id) {
    return function (dispatch) {
        return compensationApi.getCompensationById(_id).then(compensation => {
            return compensation;
        }).catch(error => {
            throw (error);
        })
    }
}

export function editCompensation(newComp) {
    return function (dispatch) {
        return compensationApi.editCompensation(newComp).then(compensation => {
            return compensation;
        }).catch(error => {
            throw (error);
        })
    }
}

/*export function getCompensationByIdSuccess(compensation) {
    return {
        type: types.GET_COMPENSATION_BY_ID,
        compensation
    }
}*/