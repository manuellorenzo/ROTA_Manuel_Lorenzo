class CompensationApi{
    static getAllCompensations(){
        return fetch('172.22.5.145:3003/compensation/getCompensations').then(response=>{
            return response.json;
        }).catch(error=>{
            return (error);
        });
    }

    static findCompensationByWorker(_id){
        return fetch('172.22.5.145:3003/compensation/getCompensationByWorker/'+_id, {
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