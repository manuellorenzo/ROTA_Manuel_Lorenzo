import * as urls from '../api/urls';
import handlePromise from './globalApiFunctions';

class WorkerApi {

    //WORKERS
    static getAllWorkers() {
        let jwt = localStorage.getItem('jwt');
        let headerObj = { 'x-access-token': jwt };
        return fetch(urls.URL_FERN + '/worker/list', { headers: headerObj }).then(response => {
            console.log("WORKERS API -- GET ALL WORKERS --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("WORKERS API -- GET ALL WORKERS ERROR --", error)
            return error;
        });
    }

    static getWorkerById(_id) {
        let jwt = localStorage.getItem('jwt');
        let headerObj = { 'x-access-token': jwt };
        return fetch(urls.URL_FERN + '/worker/findWorker/' + _id, { headers: headerObj }).then(response => {
            console.log("WORKERS API -- GET WORKER BY ID --", response)
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static editWorker(worker) {
        let jwt = localStorage.getItem('jwt');
        console.log("Edit worker api", worker);
        return fetch(urls.URL_FERN + '/worker/edit', {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worker)
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static addWorker(worker) {
        let jwt = localStorage.getItem('jwt');
        console.log("Add worker api", worker);
        return fetch(urls.URL_FERN + '/worker/new', {
            method: 'post',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worker)
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static deleteWorker(_id) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_FERN + '/worker/delete/' + _id, {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("WORKERS COMPONENT -- DELETEWORKER RESPONSE API --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("WORKERS COMPONENT -- DELETEWORKER ERROR API --", error)
            return error;
        });
    }

    //ON CALL WORKERS
    static getAllOnCallWorkers() {
        let jwt = localStorage.getItem('jwt');
        let headerObj = { 'x-access-token': jwt };
        return fetch(urls.URL_FERN + '/worker/findWorkerOnCall', { headers: headerObj }).then(response => {
            console.log("WORKERS API -- GET ON CALL WORKERS --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("WORKERS API -- GET ON CALL WORKERS ERROR --", error)
            return error;
        });
    }

    static addToOnCallWorker(_id) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_FERN + '/worker/addOnCallWorker/' + _id, {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("WORKERS API -- ADDTOONCALL RESPONSE API --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("WORKERS API -- ADDTOONCALL ERROR API --", error)
            return error;
        });
    }

    static removeFromOnCallWorker(_id) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_FERN + '/worker/removeOnCallWorker/' + _id, {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("WORKERS API -- removeFromOnCallWorker RESPONSE API -- ", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("WORKERS API -- removeFromOnCallWorker ERROR API -- ", error)
            return error;
        });
    }
}

export default WorkerApi;