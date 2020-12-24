var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var part = new Schema({

    description: {type: String, required: true},
    item: {type: String, required: true},
    price: {type: String, required: true},
    amount: {type: String, required: true},
    color: {type: String, required: true},
    urlPicture: {type: String, required: true},

});

//part.plugin(mongooseUniqueValidator);

module.exports = Part = mongoose.model('part', part);