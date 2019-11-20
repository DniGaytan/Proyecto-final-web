const express = require('express');
const session = require('express-session');
//falta definir aqui las rutas
//const routes = require('./routesFolder');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');


const app = express();


let users = require('./Routes/users');
let stores = require('./Routes/stores');
let products = require('./Routes/products');



//se conecta a la base de datos. Si no existe, la crea
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/StoreGarden',{ useUnifiedTopology: true });

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

app.use(users);

app.use(stores);

app.use(products);

app.use(cookieParser());


app.listen(8080,function(){
    console.log('Server running on port ' + 8080);
});