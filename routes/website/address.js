var express=require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var uniqid=require('uniqid');
var distanceCheck = require(path.join(__dirname, '/../../dependencies/distance.js'));
const expressValidator = require('express-validator');






router.post('/new',isLoggedIn,(req,res)=>{

    console.log("haha");
    let contact=req.body.contact;
    let landmark=req.body.landmark;
    let add=req.body.add;
    req.checkBody('contact', 'Enter a valid phone number').isNumeric().isLength({min : 10, max : 10});   
    req.checkBody('landmark', 'Please specify a landmark').notEmpty(); 
    req.checkBody('add', 'Please provide a valid address').notEmpty();    
    var errors = req.validationErrors();

    if(errors){
        res.redirect('/profile');
    }
    var id=uniqid('address-');
            var q1="INSERT INTO address(id,user_id,contact,address,created_on) VALUES ("+mysql.escape(id)+","+mysql.escape(req.session.passport["user"])+","+mysql.escape(contact)+","+mysql.escape(landmark+','+add)+","+mysql.escape(new Date())+")";
            conn.query(q1,(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.redirect('/profile');
            });
});






//delete---------------------------------

router.get('/delete/:id',isLoggedIn,(req,res)=>{
    var id = req.params.id;
    if(id){
        var q1="SELECT * FROM address WHERE id="+mysql.escape(id)+" AND user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q1,(err,res1)=>{
            if(err){
                console.log(err);
            }
            if(res1.length==1){
                var q2="DELETE FROM address WHERE id="+mysql.escape(id);
                conn.query(q2,(err,res2)=>{
                    res.redirect('/profile');
                });
            }
        });
    }
    
});

















module.exports = router;