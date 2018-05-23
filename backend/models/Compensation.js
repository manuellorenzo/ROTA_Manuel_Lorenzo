const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compensationSchema=new Schema({
    payment:String,
    dateCompensation:String,
    type:String,
    activity:{type:Schema.ObjectId, ref:'Activity'},
    worker: { type: Schema.ObjectId, ref: 'Worker'}
})

module.exports = mongoose.model('Compensation', compensationSchema);