const mongoose = require('require');

const productSchema = new mongoose.Schema({
    productId : {
        type: String,
        required: true,
    },
    productName : {
        type: String,
        required: true,
    },
    productPrice : {
        type: BigInt,
        required: true,
    },
    productQuantity : {
        type: BigInt,
        required: true,
    },
    productImg : {
        data: Buffer,
        required: true,
    }
},{collection:'Product'});

const Product = mongoose.model('Product',storeSchema);

module.exports = Product;