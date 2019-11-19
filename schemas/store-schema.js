const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
  

const storeSchema = new mongoose.Schema({
    storeId:{
        type:String,
        
    },
    storeName:{
        type:String,
        required:true
    },
    storeImg:{
        data:Buffer,
        contentType:String
    },
    storeLocation:{
        type: pointSchema,
        required: true
    },
    storeType:{
        type:String,
        required: true
    },
    storeItems:{
        type: [],
    },
    storeManager:{
        type:String,
        required: true
    }


},{collection:'Store'});

const Store = mongoose.model('Store',storeSchema);

module.exports = Store;