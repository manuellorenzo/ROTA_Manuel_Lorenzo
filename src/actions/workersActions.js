export const addWorker = worker => ({
    type: 'ADD_WORKER',
    worker
  })

  export const removeWorker = id => ({
    type: 'REMOVE_WORKER',
    id
  })
  export const addToOnCall = worker => ({
    type: 'ADD_ONCALL_WORKER',
    worker
  })
  export const removeFromOnCall = id => ({
    type: 'REMOVE_ONCALL_WORKER',
    id
  })