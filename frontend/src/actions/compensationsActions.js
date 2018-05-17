export const changeOnCallWeekMoney = newValue => ({
    type: 'CHANGE_ONCALL_WEEK_MONEY',
    newValue
  })
  export const changeOnCallWeekendMoney = newValue => ({
    type: 'CHANGE_ONCALL_WEEKEND_MONEY',
    newValue
  })

  export const changeWeekMoneyMult = newValue => ({
    type: 'CHANGE_WEEK_MONEY_MULT',
    newValue
  })
  export const changeWeekendMoneyMult = newValue => ({
    type: 'CHANGE_WEEKEND_MONEY_MULT',
    newValue
  })
  
  export const changeWeekTimeMult = newValue => ({
    type: 'CHANGE_WEEK_TIME_MULT',
    newValue
  })
  export const changeWeekendTimeMult = newValue => ({
    type: 'CHANGE_WEEKEND_TIME_MULT',
    newValue
  })

  export const changeNightStartTime = newValue =>({
    type: 'CHANGE_NIGHT_START_TIME',
    newValue
  })
  export const changeNightEndTime = newValue =>({
    type: 'CHANGE_NIGHT_END_TIME',
    newValue
  })