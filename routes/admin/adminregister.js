
"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var md5 = require('md5');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));




router.get('/register',function(req,res){
    res.send('contact admin!');
});

router.post('/register',function(req,res){
    /*var data={
        phone:req.body.phone2,
        name:req.body.first_name+' '+req.body.last_name,
        password:md5(req.body.password2),
        email:req.body.email2,
        dob:req.body.dob,
        address:req.body.address,
        //gender:req.body.gender,
        //requested:req.body.requested,
    };*/
    res.send('contact admin!');
});

module.exports = router;