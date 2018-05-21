import confApi from '../api/confApi';
import * as types from './actionTypes';

export function loadConf() {
  return function (dispatch) {
    return confApi.getAllConf().then(conf => {
      dispatch(loadConfSuccess(conf));
    }).catch(error => {
      throw (error);
    });
  };
}

export function editConf(newConf) {
  return function (dispatch) {
    return confApi.editConf(newConf).then(conf => {
      dispatch(editConfSuccess(conf));
    }).catch(error => {
      throw (error);
    });
  };
}
export function loadConfSuccess(conf) {
  return {
    type: types.LOAD_CONF_SUCCESS,
    conf
  };
}
export function editConfSuccess(conf) {
  return {
    type: types.EDIT_CONF_SUCCESS,
    conf
  };
}