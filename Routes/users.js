const express = require('express');
const user = require('../schemas/user-schema');

const router = express.Router();

//Registers new user
router.post('/register',function(req,res,next){
    let newUser={
        FirstName:req.body.FirstName,
        LastName:req.body.LastName,
        Username:req.body.Username,
        Email:req.body.Email,
        Password:req.body.Password,
    }
    user.create(newUser)
        .then(function(New){
            res.send(New);
        });
    console.log('userCreated');
});

//Registers New Store
router.post('/register',function(req,res,next){
    
});

module.exports = router;