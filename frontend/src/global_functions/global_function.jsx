import moment from "moment";

export function formatDate(date){
    return(moment(date).format('LL'));
}

export function compareHours(h){
    console.log('horas y minutos', h.hours(),' ', h.minutes())
    return (h.minutes()+h.hours())*60;
}

