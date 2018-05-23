import * as urls from '../api/urls';


class CompensationApi{
    static getAllCompensations(){
        return fetch(urls.URL_JOSE+'/compensation/getCompensations').then(response=>{
            return response.json();
        }).catch(error=>{
            return (error);
        });
    }

    static findCompensationByWorker(_id){
        return fetch(urls.URL_JOSE+'/compensation/getCompensationByWorker/'+_id, {
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
    
}

export default CompensationApi;