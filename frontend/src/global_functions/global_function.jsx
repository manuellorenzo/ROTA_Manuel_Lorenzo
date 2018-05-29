import moment from "moment";

export function formatDate(date){
    console.log('La fecha a formatear es : ', date)
    return(moment(date).format('LL'));
}

