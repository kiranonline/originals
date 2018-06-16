"use strict";

var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));



//main dashboard
router.get('/dashboard',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
        res.render('admindashboardpage.handlebars',{ admindetails :req.session.admin });
    }
});


//create new category

















module.exports = router;