"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));







router.get('/login', function(req, res){
    if(!req.isAuthenticated()){
        if(req.flash('error')){
            var message = req.flash('error');
        }
        else{
            var message=''
        }
        res.render('user/userlogin',{error:message})
    } else{
        res.redirect('/');
    }
    
});















router.post("/login",passport.authenticate('local',{

    failureRedirect:'/login',
    failureFlash : true

}),function(req,res,next){
    if(req.session.oldUrl){
        var oldUrl=req.session.oldUrl;
        req.session.oldUrl=null;
        res.redirect(oldUrl);
    }
    else{
        res.redirect('/')
    }

});


























module.exports = router;