const express = require('express');
const user = require('../schemas/user-schema');

const router = express.Router();

//guarda objeto de tipo usuario en la base de datos de mongo
//falta conectar este metodo a el formulario para registrar usuario
router.post('/register',function(req,res,next){
    user.create(req.body)
        .then(function(newUser){
            res.send(newUser);
        });
    console.log('userCreated');
});

module.exports = router;