export const addOnCall = event => ({
    type: 'ADD_ONCALL',
    event
  })

  export const changeOnCall = event => ({
    type: 'CHANGE_ONCALL',
    event
  })
  export const removeOnCall = _id => ({
    type: 'REMOVE_ONCALL',
    _id
  })