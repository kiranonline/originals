"use strict";
var mysql = require('mysql');





var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"originals"
});

conn.connect(function(err) {
    if (err) {
      console.error('error connecting to database: ' + err.stack);
      return;
    }
   
    console.log('connected to database as id ' + conn.threadId);
  });

/*

 var pool_development = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'originals'
});


*/





  
module.exports = conn;
