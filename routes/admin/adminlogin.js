"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));




router.get('/admin/login',function(req,res){
    res.render('adminregisterpage.handlebars')
});



module.exports = router;