"use strict";
var mysql = require('mysql');


var pool_development = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'originals'
  });
  
  
  
  
  
  
  
  
    
  module.exports = pool_development;