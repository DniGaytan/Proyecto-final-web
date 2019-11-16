const express = require('express');
//falta definir aqui las rutas
//const routes = require('./routesFolder');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//se conecta a la base de datos, si no existe la crea
mongoose.connect('mongodb://localhost/StoreGarden',{ useUnifiedTopology: true });

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

//app.use(routes);


app.listen(8080,function(){
    console.log('Server running on port ' + 8080);
});