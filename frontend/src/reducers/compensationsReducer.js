import * as types from '../actions/actionTypes';

const compensationsReducer = (state = {
    compensationList: [],
    compensationListFilter: []

}, action)=>{
    switch(action.type){
        case types.ADD_COMPENSATION_BY_WORKER:
            console.log('List compensations by worker', state);
            return {
                ...state,
                compensationListFilter: action.compensations
            }
        
        case types.LOAD_COMPENSATIONS_SUCCESS:
            console.log('LOAD_COMPENSATIONS', state);
            return {
                ...state,
                compensationList: action.allCompensations
            }
        case types.EDIT_COMPENSATION_SUCCESS:
            console.log('EDIT COMPENSATION');
            return{
                ...state,
                compensationList:action.editCompensations
            }
        default:
            return state;
    }
}

export default compensationsReducer;