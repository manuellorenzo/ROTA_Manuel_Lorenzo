const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema=new Schema({
    nightStartTime:String,
    nightEndTime: String,
    onCallWeekMoney:Double,
    onCallWeekendMoney:Double,
    
    //before
    beforeNTWeekMoney:Double,
    beforeNTWeekTime:Double,
    beforeNTWeekendMoney:Double,
    beforeNTWeekendTime:Double,


    //after
    afterNTWeekMoney:Double,
    afterNTWeekTime:Double,
    afterNTWeekendMoney:Double,
    afterNTWeekendTime:Double
    //---------------------//

})

module.exports = mongoose.model('Settings', settingsSchema);