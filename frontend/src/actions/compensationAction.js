import compensationApi from '../api/CompensationApi';
import * as types from './actionTypes';


export function loadAllCompensations(){
    return function (dispatch) {
        return compensationApi.getAllCompensations().then(allCompensations => {
          dispatch(loadAllCompensationSuccess(allCompensations));
        }).catch(error => {
          throw (error);
        });
      };
}

export function loadAllCompensationSuccess(allCompensations){
    return {
        type:types.LOAD_COMPENSATIONS_SUCCESS,
        allCompensations
    }
}


export function loadCompensationByWorker(_id){
    return function (dispatch){
        return compensationApi.findCompensationByWorker(_id).then(compensations=>{
            dispatch(loadCompensationByWorkerSuccess(compensations))
        }).catch(error=>{
            throw (error);
        })
    }
}

export function loadCompensationByWorkerSuccess(compensations){
    return{
        type:types.ADD_COMPENSATION_BY_WORKER,
        compensations
    }
}

