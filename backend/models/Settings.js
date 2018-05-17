const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema=new Schema({
    nightStartTime:Date,
    nightEndTime: Date,
    onCallWeekMoney:Double,
    
    //before
    beforeNTWeekMoney:Double,
    beforeNTWeekTime:Date,

    //after
    afterNTWeekendMoney:Double,
    afterNTWeekendTime:Date
    //---------------------//

})

module.exports = mongoose.model('Settings', settingsSchema);