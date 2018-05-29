import * as urls from '../api/urls';
import _ from 'lodash'

class CompensationApi {
    static getAllCompensations() {
        return fetch(urls.URL_JOSE + '/compensation/getCompensations').then(response => {
            return response.json();
        }).catch(error => {
            return (error);
        });
    }

    static findCompensationByWorker(_id) {
        return fetch(urls.URL_JOSE + '/compensation/getCompensationByWorker/' + _id, {
            method: 'get',
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

    static getCompensationById(_id) {
        return fetch(urls.URL_JOSE + '/compensation/getCompensation/' + _id, {
            method: 'get',
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

    static editCompensation(newComp) {
        console.log("COMPENSATION API -- EDIT COMPENSATION -- ",
            _.omit(newComp, "edited")
        );
        console.log('edit compensation API',newCompensation)
        return fetch(urls.URL_JOSE + '/compensation/editCompensation', {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                _.omit(newComp, "edited")
            )
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}

export default CompensationApi;