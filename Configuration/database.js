const mongoose = require('mongoose');

const connection = mongoose.createConnection(`mongodb://127.0.0.1:27017/Shopease`)
.on('open',()=>{console.log('DataBase Connecter')})
.on('No open' , ()=>{console.log('DataBase no connecter')});

module.exports = connection ; 