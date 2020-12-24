const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var authConfig = require('../config/auth');

router.post('/cadastrar-usuario', async function(req, res, next){
    
    usuarioRecebido = req.body;

     var user = new User({  
        email: usuarioRecebido.email,
        telefone: usuarioRecebido.telefone,
        senha: usuarioRecebido.senha,
        nome: usuarioRecebido.nome,
        nomeUsuario: usuarioRecebido.nomeUsuario,
        dataNascimento: usuarioRecebido.dataNascimento,
        amigosIds: 0,
        postsIds: 0
    });
        
    user.save(function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Um erro aconteceu na hora de salvar.',
                myError: err
            });
        }
        res.status(201).json({
            myMsgSucess: "Usuário salvo com sucesso!",
            objUserSave : result
        });
    });
});




router.post('/login', async function(req, res, next){
    
    usuarioRecebido = req.body;

    var token;

    const user = await User.findOne({email: usuarioRecebido.email});

    // Verificando se o email do usuario no banco exite
    if(!user){
        return res.status(400).json('Erro! Usuário não existe');
    }

    // Verificando se senha digitada confere com a do banco
    if(!await bcrypt.compare(usuarioRecebido.senha, user.senha)){
        return res.status(400).json('Erro! Senha está errada!');
    }

    var token = await jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
    });


    res.status(200).json({myMsgSucess: 'Logado com sucesso!', user: user, token});
})






module.exports = router;