const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId : {
      type : String,
    },
    cartProducts : [String]
},{collection:'Cart'});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;
