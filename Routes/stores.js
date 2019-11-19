const express = require('express');
const store = require('../schemas/store-schema');

//Registers New Store
router.post('/register-store',function(req,res,next){
    var newStore = {
        name : req.body.storeName,
        storeImg : req.body.storeImg,
        storeLocation : req.body.storelocation,
        storeType: req.body.storeType,
        storeManager: req.body.storeManager,
    };

    var storeExists;

    store.find({storeName : newStore.name}).then( (stores) => {

        if(stores.length == 0){
            store.create(newStore).then( (store) => {
                return res.status(202).json(store);
            }).catch( (e) => {
                res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
            });
        }
        else{
            res.statusMessage = "store already exists";
            return res.status(406).json({
                message : res.statusMessage,
            });
        }
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
    });
});