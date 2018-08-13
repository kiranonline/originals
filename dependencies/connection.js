"use strict";
var mysql = require('mysql');




/*
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


*/





var pool_d  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'originals'
});



var pool_p  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'admin_theoriginals',
  password        : 'TheOriginals@13579',
  database        : 'theoriginals_db1'
});
  
//module.exports = pool_d;
module.exports = pool_p;

