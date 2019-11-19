const express = require('express');
const user = require('../schemas/user-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();


const router = express.Router();

//Verifies login credentials
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
        res.cookie('Email',userF.Email).send('cookie set');
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

//get user by storeId
router.post('/get-by-store/:id', jsonP, (req, res) => {
    user.find({Stores : {$elemMatch: {storedId: req.params.id}}}).then( (stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
        res.status(500).json({
            message : res.statusMessage,
        });
    });
});

module.exports = router;
