export const changeBaseMoney = newValue => ({
    type: 'CHANGE_BASE_MONEY',
    newValue
  })
  export const changeBaseTime = newValue => ({
    type: 'CHANGE_BASE_TIME',
    newValue
  })

  export const changeMoneyMult = newValue => ({
    type: 'CHANGE_MONEY_MULT',
    newValue
  })
  export const changeTimeMult = newValue => ({
    type: 'CHANGE_TIME_MULT',
    newValue
  })
  
  export const changeWeekMoney = newValue => ({
    type: 'CHANGE_WEEK_MONEY',
    newValue
  })
  export const changeWeekendMoney = newValue => ({
    type: 'CHANGE_WEEKEND_MONEY',
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