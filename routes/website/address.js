var express=require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var check_pin = require(path.join(__dirname, '/../../dependencies/pin.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var uniqid=require('uniqid');
var distanceCheck = require(path.join(__dirname, '/../../dependencies/distance.js'));
const expressValidator = require('express-validator');






router.post('/new',isLoggedIn,(req,res)=>{

    console.log("haha");
    let contact=req.body.contact;
    let landmark=req.body.landmark || null;
    let city=req.body.city;
    let locality=req.body.locality;
    let state=req.body.state;
    var pin=req.body.pin;
    req.checkBody('contact', 'Enter a valid phone number').isNumeric().isLength({min : 10, max : 10});   
    req.checkBody('city', 'Please provide a valid city').notEmpty();
    req.checkBody('pin', 'We dont deliver here.').notEmpty().isLength({min : 6, max : 6});; 
    req.checkBody('locality', 'Please provide a valid locality').notEmpty();
    req.checkBody('state', 'Please provide a valid state').notEmpty();   
    var errors = req.validationErrors();

    if(errors){
        res.redirect('/profile');
    }
    var id=uniqid('address-');

    check_pin(pin,function(result){
        console.log('i');
        if(result["status"]=="Found"){
            pool.getConnection((err,conn)=>{
                if(err){
                    console.log(err);
                }
                var q1="INSERT INTO address(id,user_id,locality,city,state,contact,pin,landmark,created_on) VALUES ("+mysql.escape(id)+","+mysql.escape(req.session.passport["user"])+","+mysql.escape(locality)+","+mysql.escape(city)+","+mysql.escape(state)+","+mysql.escape(contact)+","+mysql.escape(pin)+","+mysql.escape(landmark)+","+mysql.escape(new Date())+")";
                conn.query(q1,(err,result)=>{
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/profile/?msg=Address Added&s=address');
                });
        
        
                conn.release();
        
            });
        }
        else{
            res.redirect('/profile/?msg=We dont deliver here&s=address');
        }
    }); 
           
});






//delete---------------------------------

router.get('/delete/:id',isLoggedIn,(req,res)=>{
    var id = req.params.id;
    if(id){

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1="SELECT * FROM address WHERE id="+mysql.escape(id)+" AND user_id="+mysql.escape(req.session.passport["user"]);
            conn.query(q1,(err,res1)=>{
                if(err){
                    console.log(err);
                }
                if(res1.length==1){
                    var q2="DELETE FROM address WHERE id="+mysql.escape(id);
                    conn.query(q2,(err,res2)=>{
                        res.redirect('/profile/?msg=Address Deleted Successfully&s=address');
                    });
                }
            });
            conn.release();

        });
        
    }
    
});







router.post('/pin/check',(req,res)=>{
    var pin=req.body.pin;
    check_pin(pin,function(result){
        console.log('i');
        if(result["status"]=="Found"){
            res.status(200).send('S');
        }
        else{
            res.status(404).send('F');
        }
    });
});































module.exports = router;