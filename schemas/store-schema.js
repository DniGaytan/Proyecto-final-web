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
    storeName:{
        type:String,
        required:true
    },
    storeImg:{
        type:Buffer,
    },
    storeImgType:{
      type: String,
    },
    storeLocation:{
        type: pointSchema,
        required: true
    },
    storeType:{
        type:String,
        required: true
    },
    storeDescription:{
        type: String,
    },
    storeManager:{
        type:String,
        required:true
    },
    Products:[String],
},{collection:'Store'});

storeSchema.virtual('storeImgPath').get(function() {
  if (this.storeImg != null && this.storeImgType != null){
    return `data:${this.storeImgType};charset=utf-8;base64,${this.storeImg.toString('base64')}`;
  }
})

const Store = mongoose.model('Store',storeSchema);

module.exports = Store;
