const express = require('express');
const mongoose = require('mongoose');
const user = require('../schemas/user-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();
const path = require('path');

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
            //if cookie refers to an email not found in the database the cookie is destroyed
            res.clearCookie('Email');
            return res.status(404).send();
        }

        res.cookie('Email',userF.Email, { maxAge: 90000000 });
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
        .then(function(NewUser){
            res.cookie('Email',NewUser.Email, { maxAge: 9000000 });
            res.send(NewUser);
        });
    console.log('userCreated');
});

//get user by storeId
router.post('/get-by-store/:id', jsonP, (req, res) => {
    user.find({Stores : {$elemMatch: {_id: req.params.id}}}).then( (stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
        res.status(500).json({
            message : res.statusMessage,
        });
    });
});


//get user by Id
router.post('/get-by/:id', jsonP, (req, res) => {
    user.findOne({_id : req.params.id}).then( (stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
        res.status(500).json({
            message : res.statusMessage,
        });
    });
});

//get user by email
router.post('/get-user-by-email/:email', jsonP, (req, res) => {
  console.log(req.body);
    user.find({Email : req.body.email}).then( (user) => {
        return res.status(200).json(user);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
        res.status(500).json({
            message : res.statusMessage,
        });
    });
});

//push a store to the user
router.post('/push-store-to-user', jsonP, (req, res) => {
    user.find({Email : req.body.email}).then( (users) => {
      user.updateOne({_id : users[0]._id}, {$push : {Stores : req.body.id}}).then( (users) =>
        {
            user.find().then( (users2) => {
              console.log(users2);
            })
        }
    ).catch( (e) => {
      console.log(e);
      return res.status(500).json();
    });
        return res.status(200).json(user);
    }).catch( (e) => {
      console.log(e);
        res.statusMessage = "uups, db cannot be reached";
        res.status(500).json({
            message : res.statusMessage,
        });
    });
});

//validates that the user can actually see the page
router.post('/validate',(req,res)=>{
    user.findOne({Email:req.body.Email},function(err,userF){
        if(err){
            console.log(err);
            return res.status(500).send();
        }
        if(!userF){
            res.clearCookie('Email');
            return res.status(404).send();
        }
        return res.status(200).send();
    })
});

//ends user session
router.post('/logout',(req,res)=>{
    res.clearCookie('Email');
    return res.status(200).send();
});

module.exports = router;
