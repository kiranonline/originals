"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var md5 = require('md5');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));




router.get('/login',function(req,res){
    if(!req.session.admin){
        res.render('adminloginpage.handlebars',{error:''});
    }
    else{
        res.redirect('/admin/dashboard');
    }
    
});



router.post('/login',function(req,res){

    //store the data got from frontend
    var phone = req.body.phone;
    var password = req.body.password;
    //validating
    req.checkBody('phone','Phone Number is not valid !').notEmpty().isNumeric().isLength({min:10,max:10});
    req.checkBody('password','Password is not valid !').notEmpty().isLength({min:6});
    //set error variable
    var errors = req.validationErrors();
    if(errors){
        res.render('adminregisterpage.handlebars',{error:'Incorrect Details !'});
     }
     else{

        //hashing password
        var hashedpassword=md5(password);


        //login functionality

        var q1='SELECT * FROM adminlist WHERE phone='+mysql.escape(phone)+'and password='+mysql.escape(hashedpassword);
        conn.query(q1,function(err,result){

            if (err) throw err;

            if(result.length==1){
                //sessions
                req.session.admin=result[0];
                res.redirect('/admin/dashboard');
            }
            else{
                res.render('adminregisterpage.handlebars',{error:'Incorrect Details !'});
            }
        });


     }

    
});


router.get('/logout',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        req.session.destroy(function(err){
            if(err) throw err;
            res.redirect('/admin/login');
        });
    }
});


module.exports = router;