const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compensationListSchema=new Schema({
    year:Date,
    month:Date,
    compensation: {type: Schema.ObjectId, ref: 'Compensation'},
})

module.exports = mongoose.model('CompensationList', compensationListSchema);