var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
const fs =  require('fs');




//fetching homepage
router.get('/',function(req,res){

    fs.readFile(path.join(__dirname,'/../../dependencies/website.theme'), function(err, text) {
        if (err) throw err;
        var theme_data = JSON.parse(text.toString());
        var q1="SELECT * FROM carousel_main";
        conn.query(q1,function(err,result){
            if (err) throw err;
            var carousel_data = result;
            res.render('homepage.handlebars',{theme:theme_data,carousel:carousel_data,nonce:req.nonce,csrf:req.csrfToken()});
        });
      });
    

});

























module.exports = router;
