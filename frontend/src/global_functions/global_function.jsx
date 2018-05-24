import moment from "moment";

export function formatDate(date){
    console.log('La fecha a formatear es : ', date)
    return(moment(new Date(date)).format('LL'));
}

