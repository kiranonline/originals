var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));


//wallet,profile,




//get profile page
router.get('/profile',isLoggedIn,(req,res)=>{
    //res.send('My profile');
    res.render('user/profile.handlebars',{});
});






//get wallet page
router.get('/wallet',isLoggedIn,(req,res)=>{
    res.send('My wallet');
});















module.exports = router;