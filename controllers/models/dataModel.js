// dataModel.js
var mongoose = require('mongoose');
var redis = require('redis');

// setup Schema
var dataSchema = mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    exist: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});


// Export data models
var Data = module.exports = mongoose.model('data_sensor', dataSchema);
module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}  	
