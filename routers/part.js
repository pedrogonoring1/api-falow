const express = require('express');
const mongoose = require('mongoose');
const Part = require('../models/Part');
const router = express.Router();


//var authMiddleware = require('../config/middleware/auth');

//router.use(authMiddleware);


//Add new part
router.post('/newpart', async function(req, res, next){

    partReturn = req.body;

    var part = new Part({
        description: partReturn.description,
        item: partReturn.item,
        price: partReturn.price,
        amount: 1,
        color: partReturn.color,
        urlPicture: partReturn.urlPicture
    });

    part.save(function(err, result){
        if(err){
            return res.status(500).json({
                erroTitle: 'Bad error, not save.',
                error: err
            });
        }

        return res.status(200).json({
            msgSucess: 'Saved with success.',
            objPartSave: result
        });
    });
});


//get all parts
router.get('/allpart', function(req, res, next){

    Part.find().exec(function(err, result){
        if(err){
            return res.status(500).json({
                error: 'Search failure.'
            });
        }

        return res.status(200).json({
            msgSucess: 'Sucess in search.',
            objResult: result
        })
    })
})


// Deletar peça
router.delete('/:id', function(req, res, next){

    Part.findById(req.params.id, function(err, partReturn){ 
        if(err){
            return res.status(500).json({
                msgError: "Search failure.",
                error: err
            });
        }

        partReturn.remove(function(err, partDelete){ 
            if(err){
                return res.status(500).json({
                    myErroTitle: "Error deleting.",
                    myErro: err
                });
            }

            return res.status(200).json({ 
                msgSucess: "Successfully deleted.",
                partDelete: partDelete
            })
        });
    });
});


// Eddit part
router.post('/editionpart', function(req, res, next){

    partReturn = req.body;

    var part = new Part({
        description: partReturn.description,
        item: partReturn.item,
        price: partReturn.price,
        amount: 1,
        color: partReturn.color,
        urlPicture: partReturn.urlPicture
    });

    Part.findByIdAndUpdate( {_id: partReturn.id}, 
        
        {
            description: partReturn.description,
            item: partReturn.item,
            price: partReturn.price,
            amount: 1,
            color: partReturn.color,
            urlPicture: partReturn.urlPicture},
            
            function(err){
                if(err){
                    return res.status(500).json({
                        myErro: "Error in updtade.",
                        error: err
                    })
                }

                return res.status(200).json({
                    msgSucess: 'Success update.',
                    objEdit: part
                })
            });
    
});


//Pesquisar Peça
router.post('/found/:id', function(req, res, next){

    Part.findById(req.params.id, function(err, result){
        if(err){
            return res.status(500).json({
                myErroTitle: 'Error Found Part.',
                error: err
            });
        }
        return res.status(200).json({
            msgSucess: 'Sucess Found Part',
            objResult: result
        });
    });
});


module.exports = router;