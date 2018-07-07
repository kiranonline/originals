var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
const fs =  require('fs');




//homepage
router.get('/',function(req,res){

    fs.readFile(path.join(__dirname,'/../../dependencies/website.theme'), function(err, text) {
        if (err) throw err;
        var theme_data = JSON.parse(text.toString());
        res.render('homepage.handlebars',{theme:theme_data});
      });
    

});

























module.exports = router;
