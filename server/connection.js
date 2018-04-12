var mysql = require('mysql');


//connecting
var conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"originals"
});

conn.connect();



module.exports = conn;
