const  express = require('express') ; 
const bodyParser = require("body-parser");
const router = require('./Routers/User.router');

const app = express();

app.use(bodyParser.json()); //Cela signifie qu'il prend les données JSON envoyées par le client et
//  les transforme en objet JavaScript utilisable par le serveur

app.use('/',router);

module.exports = app ; 