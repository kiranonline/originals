"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname,'/../../dependencies/connection.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));
var uniqid = require('uniqid');
var flash = require('connect-flash');




//---------------------local login system------------------------------
router.get('/login', function(req, res){
    if(!req.isAuthenticated()){
        if(req.flash('error')){
            var message = req.flash('error');
            console.log(message);
        }
        else{
            var message='';
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









//---------------------------google login system-------------------------------

router.get('/login/google',passport.authenticate('google',{
    scope:[ 'https://www.googleapis.com/auth/plus.login',
    , 'https://www.googleapis.com/auth/plus.profile.emails.read' ]
}));



router.get('/login/google/status',passport.authenticate('google',{

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










//--------------------facebook login system------------------------


router.get('/login/facebook',passport.authenticate('facebook',{
    scope:['read_stream', 'publish_actions']
}));



router.get('/login/facebook/status',passport.authenticate('facebook',{

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