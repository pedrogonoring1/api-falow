const express = require('express');
const connectDB = require('./data/Connection');
const bodyParser = require('body-parser');


var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB()
const Port = process.env.Port || 8877;

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://app-falow.herokuapp.com');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//Chamando as rotas
app.use('/user', require('./routers/user'));
app.use('/part', require('./routers/part'));
app.use('/post', require('./routers/post'));


//app.listen(Port, () => console.log('Servidor Iniciado!'));
app.listen(process.env.PORT || 8080);


module.exports = app;