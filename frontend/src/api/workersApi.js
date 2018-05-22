import * as urls from '../api/urls';

class WorkerApi {
    static getAllWorkers() {
        return fetch(urls.URL_FERN+'/worker/list').then(response => {
            console.log("WORKERS API -- GET ALL WORKERS --", response)
            return response.json();
        }).catch(error => {
            console.log("WORKERS API -- GET ALL WORKERS ERROR --",error)
            return error;
        });
    }

    static editWorker(worker) {
        console.log("Edit worker api", worker);
        return fetch(urls.URL_FERN+'/worker/edit', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worker)
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static addWorker(worker) {
        console.log("Add worker api", worker);
        return fetch(urls.URL_FERN+'/worker/new', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(worker)
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static deleteWorker(_id) {
        console.log("Delete worker api", _id);
        return fetch(urls.URL_FERN+'/worker/delete/' + _id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("WORKERS COMPONENT -- DELETEWORKER RESPONSE API --",response)
            return response.json();
        }).catch(error => {
            console.log("WORKERS COMPONENT -- DELETEWORKER ERROR API --",error)
            return error;
        });
    }

}

export default WorkerApi;