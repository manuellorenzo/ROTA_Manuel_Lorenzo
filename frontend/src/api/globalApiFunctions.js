const handlePromise = (response) => {
    return response.json().then(data => {
        console.log("HANDLE PROMISE WORKERS COMPONENT",response);
        if (response.ok) {
            return {
                status: response.status,
                data
            };
        } else {
            return Promise.reject({
                status: response.status,
                data
            });
        }
    });
}

export default handlePromise;