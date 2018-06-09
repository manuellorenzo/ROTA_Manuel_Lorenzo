import * as urls from '../api/urls';
import handlePromise from './globalApiFunctions';

class CompensationApi {
    static getAllCompensations() {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_JOSE + '/compensation/getCompensations', {
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return (error);
        });
    }

    static findCompensationByWorker(_id) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_JOSE + '/compensation/getCompensationByWorker/' + _id, {
            method: 'get',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static getCompensationById(_id) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_JOSE + '/compensation/getCompensation/' + _id, {
            method: 'get',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static editCompensation(newComp) {
        let jwt = localStorage.getItem('jwt');
        console.log('edit compensation API', newComp)
        return fetch(urls.URL_JOSE + '/compensation/editCompensation', {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                newComp
            )
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

    static addCompensation(newComp) {
        let jwt = localStorage.getItem('jwt');
        console.log('add compensation API', newComp)
        return fetch(urls.URL_JOSE + '/compensation/addCompensation', {
            method: 'post',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                newComp
            )
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }

}

export default CompensationApi;