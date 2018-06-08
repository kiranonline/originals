"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
//var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));

//render registration form
router.get('/register', function(req, res){
    res.render('userregisterpage.handlebars');
});


//store registration data in table
router.post('/register', function(req, res){

    //validation of input data
    let f_name = req.body.first_name;
    let l_name = req.body.last_name;
    let email = req.body.email2;
    let phone = req.body.phone2;
    let dob = req.body.dob;
    let pass = req.body.password2;
    let pass_cnf = req.body.password2_confirm;

    req.checkBody('f_name', 'First name is required').notEmpty();
    req.checkBody('l_name', 'Last name is required').notEmpty();
    req.checkBody('email', "E-mail can't be blank").notEmpty();
    req.checkBody("email", "Enter a valid email address").isEmail();

    var errors = req.validationErrors();
   if(errors){
      console.log(errors);
      res.redirect('/');
   }
   else{
      console.log('Voila');
      res.redirect('/');
   }
    
})




module.exports = router;