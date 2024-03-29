const express = require('express');
const store = require('../schemas/store-schema');
const user = require('../schemas/user-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']


const router = express.Router();

//Registers New Store
router.post('/register-store',  function(req,res,next){
    var lat = req.body.lat;
    var lon =req.body.lon;
    const location = {type:'Point',coordinates:[lon,lat]};
    let manager;
    console.log("This is the store managers email " + req.body.storeManager);
    user.findOne({Email:req.body.storeManager},function (err,usr) {
        console.log("Entered1");
        manager = usr._id;
        console.log(manager);
        var newStore = {
            storeName : req.body.storeName,
            storeImg : req.body.storeImg,
            storeLocation:location,
            storeDescription:req.body.storeDescription,
            storeType: req.body.storeType,
            storeManager: manager,
        };
        //console.log(newStore);
        store.find({storeName : newStore.storeName}).then((stores) => {
            console.log("Entered2");
            console.log(stores);
            console.log(stores.length);
            if(stores.length == 0){
                store.create(newStore).then((store) => {
                    console.log("Entered3");
                    console.log(req.body.storeImage);
                    saveImg(store, req.body.storeImage);
                    return res.status(202).json(store);
                }).catch( (e) => {
                    res.statusMessage = "uupds, db cannot be reached";
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
});

//get all the stores
router.get('/get-stores', (req, res) => {

    store.find().then((stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
    });
});

//get the required store by store id
router.post('/get/:id', jsonP, (req, res) => {
  console.log('hey');
    if(req.params.id == ""){
        res.statusMessage = "ids does not match";
        return res.status(406).json({
            message : res.statusMessage,
        });
    }
    store.findOne({_id: req.params.id}).then((stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
    });
});

//get the stores by manager id
router.post('/get-by-manager/:id', jsonP, (req, res) => {
    console.log('aqui llega');
    if(req.params.id == ''){
        res.statusMessage = "ids does not match";
        return res.status(406).json({
            message : res.statusMessage,
        });
    }
    store.find({storeManager: req.params.id}).then((stores) => {
        return res.status(200).json(stores);
    }).catch( (e) => {
        res.statusMessage = "uups, db cannot be reached";
                res.status(500).json({
                    message : res.statusMessage,
                });
    });
});

//get the stores by location {lat: string, lon: string}
router.post('/get-by-location', jsonP, (req, res) => {
    var storesReturned;
    for(var tempLatPos = req.body.lat, tempLatNeg = req.body.lat;
        tempLatPos < (req.body.lat + 100) && tempLatNeg > (req.body.lat - 100); tempLatPos++, tempLatNeg--){
            for(var tempLonPos = req.body.lon, tempLonNeg = req.body.lon;
                tempLonPos < (req.body.lon + 100) && tempLonNeg > (req.body.lon - 100); tempLonPos++, tempLonNeg--){
                    store.find({storeLocation : {tempLatPos, tempLonPos}}).then((stores) => {
                        storesReturned = stores;
                    }).catch( (e) => {
                        res.statusMessage = "uups, db cannot be reached";
                                res.status(500).json({
                                    message : res.statusMessage,
                                });
                    });
                    store.find({storeLocation : {tempLatNeg, tempLonNeg}}).then((stores) => {
                        storesReturne.push(stores);
                    }).catch( (e) => {
                        res.statusMessage = "uups, db cannot be reached";
                                res.status(500).json({
                                    message : res.statusMessage,
                                });
                    });
                    store.find({storeLocation : {tempLatPos, tempLonNeg}}).then((stores) => {
                        storesReturned.push(stores);
                    }).catch( (e) => {
                        res.statusMessage = "uups, db cannot be reached";
                                res.status(500).json({
                                    message : res.statusMessage,
                                });
                    });
                }
        }
        return res.status(202).json(storesReturned);
})

function saveImg(img, imgEncoded){
  if(imgEncoded == null) {
    return
  }
  var imgParsed = JSON.parse(imgEncoded);
  if(imgParsed != null){
    store.storeImg = new Buffer.from(imgParsed.data, 'base64');
    store.storeImgType = 'image/jpg';
  }
}

module.exports = router;
