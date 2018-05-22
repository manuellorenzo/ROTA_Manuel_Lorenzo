import * as urls from '../api/urls';

class ConfApi {
    static getAllConf() {
        return fetch(urls.URL_JOSE+'/configuration/getConfiguration').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editConf(newConf) {
        console.log("Edit conf api", newConf);
        return fetch(urls.URL_JOSE+'/configuration/editConfiguration', {
            method: 'put',
            headers: {
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