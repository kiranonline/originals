var express=require('express');
var router=express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var cashback = require(path.join(__dirname, '/../../dependencies/cashback.js'));
var uniqid=require('uniqid');






router.get('/dummy',(req,res)=>{

    console.log("haha");
    res.render('haha');
    //res.send('Haaa');
    //res.render('haha',{layout:false});
});
router.post('/add/cashback',(req,res)=>{
    cashback(req.body.order_id,function(){
        console.log("cashbck callback");
    });

});

module.exports=router;