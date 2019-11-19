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

//get the required store by store id
router.post('/get/:id', (req, res) => {
    if(req.params.id != req.body.storeId){
        res.statusMessage = "ids does not match";
        return res.status(406).json({
            message : res.statusMessage,
        });
    }
    store.find({storeId: req.params.storeId}).then((stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
    })
});