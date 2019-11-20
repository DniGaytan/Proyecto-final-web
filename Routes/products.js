const express = require('express');
const store = require('../schemas/product-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();

const router = express.Router();


//create product
router.post('/product',function(req,res){
    let newProduct ={
        productId:req.body.productId,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productQuantity:req.body.productQuantity,
        productImg:req.body.productImg
    }
});

//get products given a store

//reduce product quantity

//delete product

//modify product

module.exports = router;
