const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/Post');
const router = express.Router();

//var authMiddleware = require('../config/middleware/auth');

//router.use(authMiddleware);

//Criar um post
router.post('/add-post', async function(req, res, next){
    postRecebido = req.body;

    var post = new Post({
        tag: postRecebido.tag,
        idUsuario: postRecebido.idUsuario,
        nomeUsuario: postRecebido.nomeUsuario,
        mensagem: postRecebido.mensagem,
        dateTime: postRecebido.dateTime,
        visualizacoes: 0,
        curtidas: 0
    });

    post.save(function(err, result){
        if(err){
            return res.status(500).json({
                tituloErro: "Falha ao criar post.",
                mensagemErro: err
            });
        };

        return res.status(200).json({
            tituloSucesso: "Post criado com sucesso!",
            objetoPostGerado: result
        });
    });
});

//Obter todos os post
router.get('/obter-todos', async function(req, res, next){
    Post.find().exec(function(err, result){
        if(err){
            return res.status(500).json({
                tituloErro: "Falha ao obter todos os posts.",
                mensagemErro: err
            });
        };

        return res.status(200).json({
            tituloSucesso: "Todos os posts recuperados com sucesso.",
            objetosPostsRecuperados: result
        });
    });
});


module.exports = router;