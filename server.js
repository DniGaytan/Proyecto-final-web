const express = require('express');
const session = require('express-session');
//falta definir aqui las rutas
//const routes = require('./routesFolder');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


let users = require('./Routes/users');


//se conecta a la base de datos, si no existe la crea
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/StoreGarden',{ useUnifiedTopology: true });

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(users);


app.listen(8080,function(){
    console.log('Server running on port ' + 8080);
});
