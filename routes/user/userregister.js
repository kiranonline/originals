"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var sendEmail = require(path.join(__dirname,'/../../dependencies/email.js'));
var md5 = require('md5');
var nodemailer = require('nodemailer');
const expressValidator = require('express-validator');

//render registration form
router.get('/register', function(req, res){
    res.render('user/userregisterpage.handlebars',{layout:false,error: '',form:'reg'});
});



router.post('/register', function(req, res){
 console.log(req.body);
    //validation of input data
    let f_name = req.body.first_name;
    let l_name = req.body.last_name;
    let email = req.body.email2;
    let phone = req.body.phone2;
    let age = req.body.age;
    let gender = req.body.gender;
    let pass = req.body.password2;
    let pass_cnf = req.body.password2_confirm;
    let rand = 0;
    console.log(req.body.email2);

    req.checkBody('first_name', 'First name is required').notEmpty();
    req.checkBody('last_name', 'Last name is required').notEmpty();
    //req.checkBody('email2', "Invalid Email Id").notEmpty().isEmail();
    req.checkBody('phone2', 'Enter a valid phone number').isNumeric().isLength({min : 10, max : 10});    
    req.checkBody('phone2', "Phone number field can't be kept blank").notEmpty();
    req.checkBody("age", "Enter in the correct age").isNumeric().isLength({min : 2, max : 2}); 
    req.checkBody("password2", "Password must be longer than 5 characters").notEmpty().isLength({min : 6});
    req.checkBody("password2_confirm", "Entry must match the Password entered above").notEmpty().equals(pass);
    var errors = req.validationErrors();
    
   if(errors){
      console.log(errors);
      res.render('user/userregisterpage.handlebars', {layout:false,error : 'Invalid entries!'});
   }
   else{
       console.log('Got it');
    //check whether user phone or email already registered on userlist

    var q3 = 'select * from userlist where phone =' + mysql.escape(phone) + ' or email=' +mysql.escape(email);
    conn.query(q3, function(err, result) {
        if(err) throw err;
        if(result.length>0){
            res.render('user/userregisterpage.handlebars', {layout:false,error : 'The phone number or Email-id is already registered.'});
        }
        else{
            //check whether phone number or email id already on temporary userlist pending for verification of email

            var q4 = 'select * from tempuserlist where phone =' + mysql.escape(phone) + ' or email=' +mysql.escape(email);

            conn.query(q4, function(err, result){
                if(err) throw err;
                if(result.length>0){
                    //if phone number or email id pending for verification then remove from temporary userlist.


                    var q5 = 'delete from tempuserlist where phone =' + mysql.escape(phone) + ' or email=' +mysql.escape(email);
                    conn.query(q5, function(err, result){
                        if(err) throw err;
                        else{
                            
                            var name=f_name + " " + l_name;
                            var d = new Date();
                            var pass_encrypt  = md5(pass);

                            //creation of random number for verification
                            rand = Math.floor((Math.random() * 10000) + (Math.random())*1000 + (Math.random())*100 + (Math.random())*10 + (Math.random()));
                            //fetching host and generating verification link
                            let host = req.get('host');
                            let link="http://"+req.get('host')+"/verify?id="+rand;
                            var q2 = 'insert into tempuserlist (name, phone, password, email, gender, age, timeofquery, otp) values (' + mysql.escape(name) + ',' + mysql.escape(phone) + ',' + mysql.escape(pass_encrypt) + ',' + mysql.escape(email) + ','+mysql.escape(gender)+',' + mysql.escape(age) + ',' + mysql.escape(d) + ',' + mysql.escape(link) +')';
        
                            conn.query(q2, function (err, result) {
                            if (err) throw err;
                            else{
                            console.log("1 record inserted");
                            

                            sendEmail(name,email,link);
                        
                            
                            //rendering the page for resending verification mail if not yet recieved
                            res.render('user/verification.handlebars', {layout:false,email : email});
                        }

                            
                    });
                            }
                    })
                }

                else{   
                    //check whether phone number or email id already on temporary userlist pending for verification of email


                                var name=f_name + " " + l_name;
                                var d = new Date();
                                var pass_encrypt  = md5(pass);
                                rand = Math.floor((Math.random() * 10000) + (Math.random())*1000 + (Math.random())*100 + (Math.random())*10 + (Math.random()));
                                let host = req.get('host');
                                let link="http://"+req.get('host')+"/verify?id="+rand;
                                var q2 = 'insert into tempuserlist (name, phone, password, email, gender, age, timeofquery, otp) values (' + mysql.escape(name) + ',' + mysql.escape(phone) + ',' + mysql.escape(pass_encrypt) + ',' + mysql.escape(email) + ','+mysql.escape(gender)+',' + mysql.escape(age) + ',' + mysql.escape(d) + ',' + mysql.escape(link) +')';
            
                                conn.query(q2, function (err, result) {
                                if (err) throw err;
                                else{
                                console.log("1 record inserted");
                                
    
                                sendEmail(name,email,link);
                                
                                res.render('user/verification.handlebars', {layout:false,email : email});
                            }
    
                                
                        });
                                
                        
                    
                }
                });
            
        }
    });
    
   }

});


router.get('/verify', function(req, res){
    var link = req.protocol + '://' + req.get('host') + req.originalUrl;
    var q = 'select otp from tempuserlist where otp = ' + mysql.escape(link);
    conn.query(q, function (err, result) {
        if (err) throw err;
        else{
        if (result.length>0){
            console.log('verified');
            var cart="{\"items\":'[]'}";
            var q1 = "insert userlist (name, phone, password, email, gender, age, timeofquery,cart) select name, phone, password, email, gender, age, current_timestamp(),"+mysql.escape(cart)+ "from tempuserlist where otp = " + mysql.escape(link);
            var q2 = "delete from tempuserlist where otp = " + mysql.escape(link);
            conn.query(q1, function (err, result){
                if (err) throw err;
                else{
                    conn.query(q2, function (err, result) {
                        if (err) throw err;
                        else{
                            console.log('successful registration');
                            res.render('user/userlogin.handlebars', {msg : 'E-mail id successfully is verified!'});
                        }
                    })
                }
            })
        }
        else{
            console.log('bad request');
            res.send('Oops! User authentication failed or link expired.');
        }
        }
})
});    


module.exports = router;