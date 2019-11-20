const express = require('express');
const store = require('../schemas/store-schema');
//let uuid = require('uuid');
let parser = require('body-parser');
let jsonP = parser.json();

const router = express.Router();


module.exports = router;
