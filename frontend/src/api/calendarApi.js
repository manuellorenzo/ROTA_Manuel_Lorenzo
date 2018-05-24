import * as urls from '../api/urls';
import handlePromise from './globalApiFunctions';

class calendarApi {

    //CALENDAR
    static autoSchedule(start, end) {
        console.log("CALENDAR API -- AUTO SCHEDULE -- ", JSON.stringify({
            start: start._i,
            end: end._i
        }))
        return fetch(urls.URL_FERN + '/event/autoSchedule', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start,
                end
            })
        }).then(response => {
            console.log("CALENDAR API -- AUTOSCHEDULE RESPONSE --", response)
            return handlePromise(response);
        }).catch(error => {
            console.log("CALENDAR API -- AUTOSCHEDULE ERROR --", error)
            return error;
        });
    }

    static loadEvents() {
        return fetch(urls.URL_FERN + '/event/list').then(response => {
            console.log("CALENDAR API -- LOAD EVENTS RESPONSE --", response)
            if(response.status === 404){
                return {status: 404, data: []};
            }
            return handlePromise(response);
        }).catch(error => {
            console.log("CALENDAR API -- LOAD EVENTS ERROR --", error)
            return error;
        });
    }

    static addOnCallEvent(newEvent) {
        console.log("CALENDAR API -- ADD ON CALL EVENT", newEvent);
        return fetch(urls.URL_FERN + '/event/new', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        }).then(response => {
            return handlePromise(response);
        }).catch(error => {
            return error;
        });
    }
}

export default calendarApi;