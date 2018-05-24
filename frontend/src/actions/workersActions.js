import workersApi from '../api/workersApi';
import * as types from './actionTypes';

export function loadWorkers() {
  return function (dispatch) {
    return workersApi.getAllWorkers().then(response => {
      if (response.status === 200) {
        console.log("WORKERS ACTIONS -- LOAD ALL WORKERS --", response);
        dispatch(loadWorkersSuccess(response.data));
      }else{
        console.log("WORKERS ACTIONS -- LOAD ALL WORKERS ERROR", response);
      }
      return response.status;
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

export function getWorkerById(_id){
  return function (dispatch) {
    return workersApi.getWorkerById(_id).then(response => {
      if (response.status === 200) {
        console.log("WORKERS ACTIONS -- GET WORKER BY ID --", response);
        return response.data;
      }else{
        console.log("WORKERS ACTIONS -- GET WORKER BY ID ERROR", response);
      }
    }).catch(error => {
      throw (error);
    });
  };
}


export function editWorker(worker) {
  return function (dispatch) {
    return workersApi.editWorker(worker).then(response => {
      if (response.status === 201) {
        dispatch(editWorkerSucess(response.data));
      }else{
        console.log("WORKERS ACTIONS -- EDIT WORKERS -- ERROR ",response);
      }
      return response.status;
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
    return workersApi.addWorker(worker).then(response => {
      if (response.status === 201) {
        dispatch(addWorkerSuccess(response.data));
      } else {
        console.log("WORKERS ACTIONS -- ADD WORKERS -- ERROR ",response);
      }
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
      if (response.status === 201) {
        dispatch(deleteWorkerSuccess(_id));
      } else {
        console.log("WORKERS ACTIONS -- ERROR LOOKING FOR WORKERS TO DELETE ",response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function deleteWorkerSuccess(_id) {
  console.log("WORKERS ACTIONS -- DELETE WORKERS SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}

export function loadOnCallWorkers() {
  return function (dispatch) {
    return workersApi.getAllOnCallWorkers().then(response => {
      if (response.status === 200) {
        console.log("WORKERS ACTIONS -- LOAD ON CALL WORKERS --", response)
        dispatch(loadOnCallWorkersSuccess(response.data));
      } else {
        console.log("WORKERS ACTIONS -- ERROR LOADING ON CALL WORKERS", response)
      }
      return response.status;
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
      if (response.status === 201) {
        dispatch(addToOnCallWorkerSuccess(_id));
      } else {
        console.log("WORKERS ACTIONS -- ERROR LOOKING FOR WORKERS TO ADD TO ONCALL", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function addToOnCallWorkerSuccess(_id) {
  console.log("WORKERS ACTIONS -- ADD WORKERS ON CALL SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}

export function removeFromOnCallWorker(_id) {
  return function (dispatch) {
    return workersApi.removeFromOnCallWorker(_id).then(response => {
      if (response.status === 201) {
        dispatch(removeFromOnCallWorkerSuccess(_id));
      } else {
        console.log("WORKERS ACTIONS -- ERROR LOOKING FOR WORKERS TO remove From ONCALL ", response)
      }
      return response.status;
    }).catch(error => {
      throw (error);
    });
  };
}
export function removeFromOnCallWorkerSuccess(_id) {
  console.log("WORKERS ACTIONS -- removeFrom WORKERS SUCCESS ACTION", _id)
  return {
    type: types.DELETE_WORKER_SUCCESS,
    _id
  };
}