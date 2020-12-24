//Joao
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

var Schema = new Schema({
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    senha: {type: String, required: true},
    nome: {type: String, required: true},
    nomeUsuario: {type: String, required: true},
    dataNascimento: {type: Date, required: true},
    amigosIds: {type: String, required: true},
    postsIds: {type: String, required: true},
});

Schema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

module.exports = mongoose.model('User', Schema);