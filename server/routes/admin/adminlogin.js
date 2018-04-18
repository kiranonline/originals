var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../connection.js'));


router.get('/',function(req,res){
    res.render('loginpage.handlebars');
})





















module.exports = router;