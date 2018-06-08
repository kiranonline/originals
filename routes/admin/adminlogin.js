"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
const expressValidator = require('express-validator');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));




router.get('/admin/login',function(req,res){
    res.render('adminregisterpage.handlebars')
});



router.post('/admin/login',function(req,res){

    //store the data got from frontend
    var phone = req.body.phone;
    var password = req.body.password;

    //validating
    req.checkBody('phone','Phone Number is not valid !').notEmpty().isNumber().isLength({min:10,max:10});
    req.checkBody('password','Password is not valid !').notEmpty().isLength({min:6});

    //set error variable
    var errors = req.validationErrors();
    if(errors){
        console.log(errors);
        res.send('hello error');
     }
     else{
        console.log(errors);
        res.send('no error');
     }

    
});


module.exports = router;