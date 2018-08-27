var mongoose = require('mongoose');
var EventSchema = new mongoose.Schema({
    name: String,
    location: String,
    date: Date
});

mongoose.model('Event',EventSchema);

module.exports = mongoose.model('Event');