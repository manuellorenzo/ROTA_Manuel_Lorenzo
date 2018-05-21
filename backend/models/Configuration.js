const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configurationSchema=new Schema({
    nightStartTime:String,
    nightEndTime: String,
    onCallWeekMoney:Number,
    onCallWeekendMoney:Number,
    
    //before
    bfNtWeekMoneyMult:Number,
    bfNtWeekTimeMult:Number,
    bfNtWeekendMoneyMult:Number,
    bfNtWeekendTimeMult:Number,


    //after
    afNtWeekMoneyMult:Number,
    afNtWeekTimeMult:Number,
    afNtWeekendMoneyMult:Number,
    afNtWeekendTimeMult:Number
    //---------------------//

})

module.exports = mongoose.model('Configuration', configurationSchema);