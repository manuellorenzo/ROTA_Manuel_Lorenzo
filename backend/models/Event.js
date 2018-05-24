const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    start: Date,
    end: Date,
    title: String,
    type: String,
    workerId: {type: Schema.ObjectId, ref: 'Worker'},
    compensations: [{type: Schema.ObjectId, ref: 'Compensation'}]
});

module.exports = mongoose.model('Event', eventSchema);