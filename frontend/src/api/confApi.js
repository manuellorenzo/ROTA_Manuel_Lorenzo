class ConfApi {
    static getAllConf() {
        return fetch('http://172.22.5.145:3000/configuration/getConfiguration').then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static editConf(newConf) {
        console.log("Edit conf api", newConf);
        return fetch('http://172.22.5.145:3000/configuration/editConfiguration', {
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