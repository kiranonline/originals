"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));









router.get('/login', function(req, res){
    if(!req.isAuthenticated()){
        res.render('user/userlogin.handlebars',{layout:false});
    } else{
        res.send("You are logged in");

    }
    
});















router.post("/login", passport.authenticate('local', {

    successRedirect: '/',

    failureRedirect: '/admin/login',

    failureFlash: true

}), function(req, res, info){
    console.log(info);
    console.log('hi');
    res.send(req.flash('message'));

});

































module.exports = router;