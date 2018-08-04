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
    var q1="SELECT * FROM address WHERE user_id="+mysql.escape(req.session.passport["user"]);
    conn.query(q1,(err,res1)=>{
        if(err){
            console.log(err);
        }
        var q2="SELECT * FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
        conn.query(q2,(err,res2)=>{
            if(err){
                console.log(err);
            }
            res.render('user/profile.handlebars',{user:res2[0],address:res1});
        });
        
    });
    
});






//get wallet page
router.get('/wallet',isLoggedIn,(req,res)=>{
    res.send('My wallet');
});















module.exports = router;