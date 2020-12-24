const mongoose = require('mongoose');

const URI = "mongodb+srv://dbUser:dbUser@cluster0.rqgk6.mongodb.net/webpecas?retryWrites=true&w=majority";

const connectDB = async()=>{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log('DB Conectado!');
}

module.exports = connectDB; 