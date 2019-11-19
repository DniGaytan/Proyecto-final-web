const express = require('express');
const user = require('../schemas/user-schema');

const router = express.Router();

//Verifies login credentials
//
router.post('/login',function(req,res){
    let LoginUser={
        Email:req.body.Email,
        Password:req.body.Password
    }
    user.findOne({Email:LoginUser.Email,Password:LoginUser.Password},function(err,userF){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!userF){
            return res.status(404).send();
        }
        console.log(userF);
        return res.status(200).send();
    })
});

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