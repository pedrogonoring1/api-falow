var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;
//var mongooseUniqueValidator = require('mongoose-unique-validator');

var post = new Schema({

    tag: {type: String, required: true},
    idUsuario: {type: String, required: true},
    mensagem: {type: String, required: true},
    dateTime: {type: Date, required: true},
    nomeUsuario: {type: String, required: true},
    curtidas: {type: Number, required: true},
    visualizacoes: {type: Number, required: true},
    
});

//part.plugin(mongooseUniqueValidator);

module.exports = Post = mongoose.model('post', post);