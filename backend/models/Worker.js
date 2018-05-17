const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workerSchema = new Schema({
    name: String,
    role: String
});

module.exports = mongoose.model('Worker', workerSchema);