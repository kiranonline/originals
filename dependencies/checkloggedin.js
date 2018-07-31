var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var conn = require(path.join(__dirname,'/passportlogin.js'));




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.session.oldUrl=req.url;
    res.redirect('/login');
}



module.exports = isLoggedIn;