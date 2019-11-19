const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
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
    },
    Password:{
        type:String,
        required:true,
    },
    Stores:{
        type: [],
    }
},{collection:'User'});

const User =  mongoose.model('User',userSchema);

module.exports = User;