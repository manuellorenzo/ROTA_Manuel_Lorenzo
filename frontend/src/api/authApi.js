import * as urls from '../api/urls';
import handlePromise from './globalApiFunctions';

class authApi {

    //AUTH
    static createJWT(idToken) {
        return fetch(urls.URL_FERN + '/auth/createjwt', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idToken
            })
        }).then(response => {
            console.log("AUTH API -- CREATE JWT RESPONSE --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("AUTH API -- CREATE JWT ERROR --", error)
            return error;
        });
    }
}

export default authApi;