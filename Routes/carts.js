const express = require('express');
const cart = require('../schemas/cart-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();

const router = express.Router();

router.post('/cart-create', jsonP, function(req,res,next){
    let newCart={
        userId: req.body.userId,
    }
    cart.create(newCart)
        .then(function(newCart){
            return res.status(200).json(newCart)
        });
    console.log('cartCreated');
});

//delete product from cart
router.post('/delete-product/:id', jsonP, (req, res) => {
  cart.updateOne({_id : req.body.cartId}, {$pull: {cartProducts : req.params.id}}).then( (cart) => {
    return res.status(202).json(cart);
  }).catch( (e) => {
    res.statusMessage = "bad connection with db";
    return res.status(500).json({
      message : res.statusMessage,
    })
  });
});

//add product to cart
router.post('/add-product/:id', jsonP, (req, res) => {
  cart.update({_id : req.body.cartId}, {$push: {cartProducts : req.params.id}}).then( (cart) => {
    return res.status(202).json(cart);
  }).catch( (e) => {
    res.statusMessage = "bad connection with db";
    return res.status(500).json({
      message : res.statusMessage,
    })
  });
});


module.exports = router;
