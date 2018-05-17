const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compensationSchema=new Schema({
    payment:Double,
    date:Date,
    type:String
})

module.exports = mongoose.model('Compensation', compensationSchema);