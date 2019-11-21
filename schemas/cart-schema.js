const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartProducts : [String]
},{collection:'Cart'});

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;
