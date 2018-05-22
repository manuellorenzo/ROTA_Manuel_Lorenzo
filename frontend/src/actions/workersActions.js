import workersApi from '../api/workersApi';
import * as types from './actionTypes';

export function loadWorkers() {
  return function (dispatch) {
    return workersApi.getAllWorkers().then(workers => {
      console.log("WORKERS ACTIONS -- LOAD ALL WORKERS --", workers)
      dispatch(loadWorkersSuccess(workers));
    }).catch(error => {
      throw (error);
    });
  };
}
export function loadWorkersSuccess(workers) {
  console.log("PROPS DATA LOAD WORKERS", workers)
  return {
    type: types.LOAD_WORKERS_SUCCESS,
    workers
  };
}

export function editWorker(worker) {
  return function (dispatch) {
    return workersApi.editWorker(worker).then(workerEdited => {
      dispatch(editWorkerSucess(workerEdited));
    }).catch(error => {
      throw (error);
    });
  };
}
export function editWorkerSucess(worker) {
  return {
    type: types.EDIT_WORKER_SUCCESS,
    worker
  };
}

export function addWorker(worker) {
  return function (dispatch) {
    return workersApi.addWorker(worker).then(workerAdded => {
      dispatch(addWorkerSuccess(workerAdded));
    }).catch(error => {
      throw (error);
    });
  };
}
export function addWorkerSuccess(worker) {
  return {
    type: types.ADD_WORKER_SUCCESS,
    worker
  };
}

export function deleteWorker(_id) {
  return function (dispatch) {
    return workersApi.deleteWorker(_id).then(status => {
      dispatch(deleteWorkerSuccess(_id));
    }).catch(error => {
      throw (error);
    });
  };
}
export function deleteWorkerSuccess(_id) {
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}

export const addToOnCall = worker => ({
  type: 'ADD_ONCALL_WORKER',
  worker
})
export const removeFromOnCall = _id => ({
  type: 'REMOVE_ONCALL_WORKER',
  _id
})