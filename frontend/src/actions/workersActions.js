export const addWorker = worker => ({
    type: 'ADD_WORKER',
    worker
  })
  export const updateWorker = worker => ({
    type: 'UPDATE_WORKER',
    worker
  })
  export const removeWorker = _id => ({
    type: 'REMOVE_WORKER',
    _id
  })
  export const addToOnCall = worker => ({
    type: 'ADD_ONCALL_WORKER',
    worker
  })
  export const removeFromOnCall = _id => ({
    type: 'REMOVE_ONCALL_WORKER',
    _id
  })

  