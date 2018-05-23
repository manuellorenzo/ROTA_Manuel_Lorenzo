import * as types from '../actions/actionTypes';

const compensationsReducer = (state = {
    compensationList:[]
}, action)=>{
    switch(action.type){
        case types.ADD_COMPENSATION_BY_WORKER:
            console.log('List compensations by worker', state);
            return {
                ...state,
                compensationList: state.compensations.map((item, index)=>{
                    if (item.workerId===action.compensations.workerId){
                        console.log('add compensation by worker ');
                        return{
                            ...action.compensations
                        }
                    }
                })
            }
        
        case types.LOAD_COMPENSATIONS_SUCCESS:
            console.log('LOAD_COMPENSATIONS', state);
            return {
                ...state,
                compensations: action.allCompensations
            }
        default:
            return state;
    }
}

export default compensationsReducer;