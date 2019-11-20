const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true
    },
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
    }
},{collection:'Product'});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;