const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true,
    },
    Description:{
        type:String
    },
    Stores:[String],
    Cart:{
      type:String,
      required:true,
    }
},{collection:'User'});

const User =  mongoose.model('User',userSchema);

module.exports = User;
