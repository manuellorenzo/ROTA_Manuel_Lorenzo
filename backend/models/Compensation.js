const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compensationSchema = new Schema({
    payment:  new Schema({
        amount: Number,
        type: String,
        date: Date
    }),
    worker: {type: Schema.ObjectId, ref: 'Worker'},
    startTime: Date,
    duration: String,
    workReference: String
});

module.exports = mongoose.model('Compensation', compensationSchema);