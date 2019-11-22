const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type: String,
        required: true
    },
    productPrice : {
        type: Number,
        required: true
    },
    productQuantity : {
        type: Number,
        required: true
    },
    productImg : {
        data: Buffer,
        contentType:String
    },
    storeId:{
        type: String,
        required: true
    }
},{collection:'Product'});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;
