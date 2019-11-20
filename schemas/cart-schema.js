const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartProducts : [
      {
        productId: String,
        productQuantity: String,
      }
    ]
},{collection:'Cart'});

const Cart = mongoose.model('Cart',productSchema);

module.exports = Cart;
