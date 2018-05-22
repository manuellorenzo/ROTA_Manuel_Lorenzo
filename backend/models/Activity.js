const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
   startTime: Date,
   duration: String,
   workReference: String
});

module.exports = mongoose.model('Activity', activitySchema);