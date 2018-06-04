"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
//var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));

//render registration form
router.get('/register', function(req, res){
    res.render('userregisterpage.handlebars');
});


//store registration data in table
router.post('/register', function(req, res){
    
})




module.exports = router;