const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    storeName:{
        type:String,
        required:true
    },
    storeImg:{
        data:Buffer,
        contentType:String
    },
    storeLocation:{
        type:String,
        required:true
    },
    storeType:{
        type:String,
        required:true
    },
    storeManager:{
        type:String,
        required:true
    }
},{collection:'Store'});

const Store = mongoose.model('Store',storeSchema);

module.exports = Store;