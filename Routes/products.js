const express = require('express');
const product = require('../schemas/product-schema');
const store = require('../schemas/store-schema');
const user = require('../schemas/user-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();


const router = express.Router();


//create product
router.post('/register-product',function(req,res){
    let newProduct ={
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productQuantity:req.body.productQuantity,
        productImg:req.body.productImg,
        storeId:req.body.storeId
    }
    console.log(newProduct.storeId);
    store.findOne({_id:newProduct.storeId}).then( (err,str) => {
        product.create(newProduct)
        .then(function(newP){
            return res.send(newP);
        })
    }); 
});

//get products given a store
router.post('/find-product',function(req,res){
    product.findOne({_id:req.body.productId}).then( (str) => {
        console.log(res.send(str));
        return res.send(str);
    });
});

//Add store id to products
router.post('/push-product-to-store', jsonP, (req, res) => {
    console.log('entred push products');
    console.log(req.body.storeId);
    console.log( req.body.productId);
    store.findOne({_id:req.body.storeId}).then((str)=>{
        store.updateOne({_id:req.body.storeId},{$push : {Products : req.body.productId}}).then( (updatedStore) =>{ 
            console.log(updatedStore);
            return res.status(200).json();
        }).catch( (e) => {
            console.log(e);
            return res.status(500).json();
          });
    });
});


//modify product
router.put('/modify-product',function(req,res){
    store.findOne({_id:req.body.storeId}).then( (str) => {
        console.log(str);
        Object.keys(str.Products).forEach(function(key){
            console.log(str.Products[key]);
            product.findOneAndUpdate({_id:str.Products[key]},req.body)
                .then(function(updated){
                    return res.send(updated);
                })
        });
    })
}); 

module.exports = router;
