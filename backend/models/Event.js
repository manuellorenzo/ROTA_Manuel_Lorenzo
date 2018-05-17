const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    start: Date,
    end: Date,
    title: String,
    Type: String,
    workerId: {type: Schema.ObjectId, ref: 'Worker'},
    activities: [{type: Schema.ObjectId, ref: 'Activity'}]
});

module.exports = mongoose.model('Event', eventSchema);