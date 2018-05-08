const compensationsReducer = (state = {
    compensations: {
        nightEndTime: "12:00",
        nightStartTime: "12:00",
        baseMoney: "1",
        baseTime: "1",
        moneyMult: "1",
        timeMult: "1",
        weekMoney: "1",
        weekendMoney: "1"
    }
}, action) => {
    switch (action.type) {
        case 'CHANGE_BASE_MONEY':
            console.log("action.newValue", action.newValue)
            return {
                ...state,
                compensations: {
                    ...state.compensations,
                    baseMoney: action.newValue
                }
            }
        case 'CHANGE_BASE_TIME':
            return {
                ...state,
                compensations: { ...state.compensations,
                    baseTime: action.newValue
                }
            }
        case 'CHANGE_MONEY_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    moneyMult: action.newValue
                }
            }
        case 'CHANGE_TIME_MULT':
            return {
                ...state,
                compensations: { ...state.compensations,
                    timeMult: action.newValue
                }
            }
        case 'CHANGE_WEEK_MONEY':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekMoney: action.newValue
                }
            }
        case 'CHANGE_WEEKEND_MONEY':
            return {
                ...state,
                compensations: { ...state.compensations,
                    weekendMoney: action.newValue
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