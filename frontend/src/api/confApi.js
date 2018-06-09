import * as urls from '../api/urls';

class ConfApi {
    static getAllConf() {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_JOSE + '/configuration/getConfiguration', {
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editConf(newConf) {
        let jwt = localStorage.getItem('jwt');
        return fetch(urls.URL_JOSE + '/configuration/editConfiguration', {
            method: 'put',
            headers: {
                'x-access-token': jwt,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConf)
        }).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

}

export default ConfApi;