const compensationsReducer = (state = {
    compensations: {
        nightEndTime: "12:00",
        nightStartTime: "12:00",
        onCallWeekMoney: "1",
        onCallWeekendMoney: "1",
        weekMoneyMult: "1",
        weekendMoneyMult: "1",
        weekTimeMult: "1",
        weekendTimeMult: "1"
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
        case 'CHANGE_WEEK_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekMoneyMult: action.newValue
                }
            }
        case 'CHANGE_WEEKEND_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekendMoneyMult: action.newValue
                }
            }
        case 'CHANGE_WEEK_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekTimeMult: action.newValue
                }
            }
        case 'CHANGE_WEEKEND_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekendTimeMult: action.newValue
                }
            }
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