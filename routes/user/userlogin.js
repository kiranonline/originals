"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));







router.get('/login', function(req, res){
    if(!req.isAuthenticated()){
        res.render('user/userlogin.handlebars',{layout:false,csrf:req.csrfToken()});
    } else{
        res.send("You are already logged in");

    }
    
});















router.post("/login",function(req,res,next){

    passport.authenticate('local',function(err,user,info){

        if (err) { return next(err); }
        if (!user) { return res.send('false'); }

        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send('true');
        });

    })(req,res,next);

});


























module.exports = router;