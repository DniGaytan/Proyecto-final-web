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
    email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    }
},{collection:'User'});

const User =  mongoose.model('User',userSchema);

module.exports = User;