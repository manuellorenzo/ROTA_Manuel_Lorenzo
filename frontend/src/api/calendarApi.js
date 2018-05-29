import * as urls from '../api/urls';
import handlePromise from './globalApiFunctions';

class calendarApi {

    //CALENDAR
    static autoSchedule(start, end) {
        console.log("CALENDAR API -- AUTO SCHEDULE -- ", JSON.stringify({start: start._i, end: end._i}))
        return fetch(urls.URL_FERN + '/event/autoSchedule', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({start, end})
        }).then(response => {
            console.log("CALENDAR API -- AUTOSCHEDULE RESPONSE --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("CALENDAR API -- AUTOSCHEDULE ERROR --", error)
            return error;
        });
    }

    static loadEvents(){
        return fetch(urls.URL_FERN + '/event/list').then(response => {
            console.log("CALENDAR API -- LOAD EVENTS RESPONSE --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("CALENDAR API -- LOAD EVENTS ERROR --", error)
            return error;
        });
    }

    static findEventByWorker(workerId){
        return fetch (urls.URL_JOSE+'/event/findEventByWorker/'+workerId, {
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

export default calendarApi;