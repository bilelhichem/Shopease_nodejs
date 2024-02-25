const  express = require('express') ; 
const bodyParser = require("body-parser");
const router = require('./Routers/User.router');
const routerProduct = require('./Routers/Product.router');
const app = express();

const UserService = require('./Services/Users.services');



app.use(bodyParser.json({ limit: '10mb' }));  //Cela signifie qu'il prend les données JSON envoyées par le client et
//  les transforme en objet JavaScript utilisable par le serveur
app.use(express.static('public'));

app.use('/',router);
app.use('/',routerProduct);




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  

  


module.exports = app ; 