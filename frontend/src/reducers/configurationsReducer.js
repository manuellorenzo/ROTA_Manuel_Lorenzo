import * as types from '../actions/actionTypes';

const configurationsReducer = (state = {
    configCompensations: {
        //ON CALL MONEY
        onCallWeekMoney: "1",
        onCallWeekendMoney: "1",
        //WEEK
        bfNtWeekMoneyMult: "1",
        afNtWeekMoneyMult: "1",
        bfNtWeekTimeMult: "1",
        afNtWeekTimeMult: "1",
        //WEEKEND
        bfNtWeekendMoneyMult: "1",
        afNtWeekendMoneyMult: "1",
        bfNtWeekendTimeMult: "1",
        afNtWeekendTimeMult: "1",
        //TIME
        nightEndTime: "12:00",
        nightStartTime: "12:00",

        _id: ''
    }
}, action) => {
    switch (action.type) {
        case types.LOAD_CONF_SUCCESS:
            console.log(types.LOAD_CONF_SUCCESS, action.conf);
            return { ...state,
                configCompensations: action.conf[0]
            };
        case types.EDIT_CONF_SUCCESS:
            console.log(types.EDIT_CONF_SUCCESS, action.conf);
            return { ...state,
                configCompensations: action.conf
            };
        default:
            return state
    }
}

export default configurationsReducer;