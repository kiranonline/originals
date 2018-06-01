"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));





//access the login page
router.get('/admin/login',function(req,res){
    res.render('adminregisterpage.handlebars');
});

//
router.post('/admin/login',function(req,res){
    res.send('welcome');
});









module.exports = router;