const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: String,
    role: Number,
    onCall: Boolean,
    inactive: Boolean
});

module.exports = mongoose.model('Worker', workerSchema);