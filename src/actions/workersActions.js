export const addWorker = worker => ({
    type: 'ADD_WORKER',
    worker
  })

  export const removeWorker = id => ({
    type: 'REMOVE_WORKER',
    id
  })