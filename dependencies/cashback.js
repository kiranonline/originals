var mysql = require('mysql');
var path = require('path');
var pool = require(path.join(__dirname,'connection.js'));



function cashback(user_id,order_id,callback){
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT cashback FROM order_table WHERE order_id="+mysql.escape(order_id);
        conn.query(q1,(err,result)={
            if(err){
                console.log(err);
            }
            
        });


    });
}



module.exports = cashback;

