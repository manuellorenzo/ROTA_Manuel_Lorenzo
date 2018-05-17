const compensationsReducer = (state = {
    compensations: {
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
    }
}, action) => {
    switch (action.type) {
        case 'CHANGE_ONCALL_WEEK_MONEY':
            console.log("action.newValue", action.newValue)
            return {
                ...state,
                compensations: {
                    ...state.compensations,
                    onCallWeekMoney: action.newValue
                }
            }
        case 'CHANGE_ONCALL_WEEKEND_MONEY':
            return {
                ...state,
                compensations: { ...state.compensations,
                    onCallWeekendMoney: action.newValue
                }
            }
            //WEEK
        case 'CHANGE_BF_NT_WEEK_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    bfNtWeekMoneyMult: action.newValue
                }
            }
        case 'CHANGE_AF_NT_WEEK_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    afNtWeekMoneyMult: action.newValue
                }
            }
        case 'CHANGE_BF_NT_WEEK_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    bfNtWeekTimeMult: action.newValue
                }
            }
        case 'CHANGE_AF_NT_WEEK_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    afNtWeekTimeMult: action.newValue
                }
            }
            //WEEKEND
        case 'CHANGE_BF_NT_WEEKEND_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    bfNtWeekendMoneyMult: action.newValue
                }
            }
        case 'CHANGE_AF_NT_WEEKEND_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    afNtWeekendMoneyMult: action.newValue
                }
            }
        case 'CHANGE_BF_NT_WEEKEND_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    bfNtWeekendTimeMult: action.newValue
                }
            }
        case 'CHANGE_AF_NT_WEEKEND_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    afNtWeekendTimeMult: action.newValue
                }
            }
            //TIME
        case 'CHANGE_NIGHT_END_TIME':
            return {
                ...state,
                compensations: { ...state.compensations,
                    nightEndTime: action.newValue
                }
            }
        case 'CHANGE_NIGHT_START_TIME':
            return {
                ...state,
                compensations: { ...state.compensations,
                    nightStartTime: action.newValue
                }
            }
        default:
            return state
    }
}

export default compensationsReducer