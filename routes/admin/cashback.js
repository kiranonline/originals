var express=require('express');
var router=express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var uniqid=require('uniqid');






router.get('/haha',(req,res)=>{

    console.log("haha");
    //res.send('Haaa');
    res.render('haha',{layout:false});
});

module.exports=router;