var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../connection.js'));



//checking for connection
conn.query('SHOW TABLES',function(err,response){
    if(err){
        throw err;
    }
    else{
        console.log(response);
    }
});



//routers
router.get('/',(req,res,next)=>{
    res.send('In the home directory');
});

module.exports = router;