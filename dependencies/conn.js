var mysql=require("mysql");
var pull_development=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"originals"
});

module.exports=pull_development;
