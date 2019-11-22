const express = require('express');
const session = require('express-session');
//falta definir aqui las rutas
//const routes = require('./routesFolder');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');


const app = express();


let users = require('./Routes/users');
let stores = require('./Routes/stores');
let products = require('./Routes/products');
let carts = require('./Routes/carts');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.redirect('/login.html');
});
//se conecta a la base de datos. Si no existe, la crea
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb://localhost/StoreGarden',{ useUnifiedTopology: true });

mongoose.Promise = global.Promise;



app.use(bodyParser.json());

app.use(users);

app.use(stores);

app.use(products);

app.use(carts);

app.use(cookieParser());


let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject ) => {
		mongoose.connect(databaseUrl, response => {
			if ( response ){
				return reject(response);
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL )
	.catch( err => {
		console.log( err );
	});

module.exports = { app, runServer, closeServer };
