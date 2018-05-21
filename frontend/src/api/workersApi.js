class WorkerApi {
    static getAllWorkers() {
        return fetch('http://172.22.4.117:3000/worker/list').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editWorker(worker) {
        console.log("Edit worker api", worker);
        return fetch('http://172.22.4.117:3000/worker/edit', {
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
        return fetch('http://172.22.4.117:3000/worker/new', {
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
        return fetch('http://172.22.4.117:3000/worker/delete/' + _id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}

export default WorkerApi;