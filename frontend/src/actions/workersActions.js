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
    return workersApi.deleteWorker(_id).then(response => {
      if (response.status === "201") {
        dispatch(deleteWorkerSuccess(_id));
      }else{
        console.log("WORKER ACTIONS -- ERROR LOOKING FOR WORKER TO DELETE")
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function deleteWorkerSuccess(_id) {
  console.log("WORKERS COMPONENT -- DELETE WORKER SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}

export function loadOnCallWorkers() {
  return function (dispatch) {
    return workersApi.getAllOnCallWorkers().then(workers => {
      console.log("WORKERS ACTIONS -- LOAD ON CALL WORKERS --", workers)
      dispatch(loadOnCallWorkersSuccess(workers));
    }).catch(error => {
      throw (error);
    });
  };
}
export function loadOnCallWorkersSuccess(workers) {
  console.log("WORKERS ACTIONS -- LOAD ON CALL WORKERS SUCCESS --", workers)
  return {
    type: types.LOAD_ON_CALL_WORKERS_SUCCESS,
    workers
  };
}

export function addToOnCallWorker(_id) {
  return function (dispatch) {
    return workersApi.addToOnCallWorker(_id).then(response => {
      if (response.status === "201") {
        dispatch(addToOnCallWorkerSuccess(_id));
      }else{
        console.log("WORKER ACTIONS -- ERROR LOOKING FOR WORKER TO ADD TO ONCALL", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function addToOnCallWorkerSuccess(_id) {
  console.log("WORKERS COMPONENT -- DELETE WORKER SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}

export function removeFromOnCallWorker(_id) {
  return function (dispatch) {
    return workersApi.removeFromOnCallWorker(_id).then(response => {
      if (response.status === "201") {
        dispatch(removeFromOnCallWorkerSuccess(_id));
      }else{
        console.log("WORKER ACTIONS -- ERROR LOOKING FOR WORKER TO remove From ONCALL")
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function removeFromOnCallWorkerSuccess(_id) {
  console.log("WORKERS COMPONENT -- removeFrom WORKER SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}
