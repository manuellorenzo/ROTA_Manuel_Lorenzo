//ON CALL MONEY
export const changeOnCallWeekMoney = newValue => ({
  type: 'CHANGE_ONCALL_WEEK_MONEY',
  newValue
})
export const changeOnCallWeekendMoney = newValue => ({
  type: 'CHANGE_ONCALL_WEEKEND_MONEY',
  newValue
})
//WEEK
export const changeBeforeNTWeekMoneyMult = newValue => ({
  type: 'CHANGE_BF_NT_WEEK_MONEY_MULT',
  newValue
})
export const changeAfterNTWeekMoneyMult = newValue => ({
  type: 'CHANGE_AF_NT_WEEK_MONEY_MULT',
  newValue
})
export const changeBeforeNTWeekTimeMult = newValue => ({
  type: 'CHANGE_BF_NT_WEEK_TIME_MULT',
  newValue
})
export const changeAfterNTWeekTimeMult = newValue => ({
  type: 'CHANGE_AF_NT_WEEK_TIME_MULT',
  newValue
})
//WEEKEND
export const changeBeforeNTWeekendMoneyMult = newValue => ({
  type: 'CHANGE_BF_NT_WEEKEND_MONEY_MULT',
  newValue
})
export const changeAfterNTWeekendMoneyMult = newValue => ({
  type: 'CHANGE_AF_NT_WEEKEND_MONEY_MULT',
  newValue
})
export const changeBeforeNTWeekendTimeMult = newValue => ({
  type: 'CHANGE_BF_NT_WEEKEND_TIME_MULT',
  newValue
})
export const changeAfterNTWeekendTimeMult = newValue => ({
  type: 'CHANGE_AF_NT_WEEKEND_TIME_MULT',
  newValue
})
//NIGHT TIME
export const changeNightStartTime = newValue => ({
  type: 'CHANGE_NIGHT_START_TIME',
  newValue
})
export const changeNightEndTime = newValue => ({
  type: 'CHANGE_NIGHT_END_TIME',
  newValue
})