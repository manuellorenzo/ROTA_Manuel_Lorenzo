import * as types from '../actions/actionTypes';

const loginReducer = (state = {
    loggedUser: null

}, action)=>{
    switch(action.type){
        case types.EDIT_USER:
            console.log('EDIT USER LOGINr', state);
            return {
                ...state,
                loggedUser: action.user
            }
        default:
            return state;
    }
}

export default loginReducer;