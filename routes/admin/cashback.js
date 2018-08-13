var express=require('express');
var router=express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var uniqid=require('uniqid');

router.post('/add/cashback',(req,res2)=>{
    var order_id=req.body.order_id;
    pool.getConnection((err,conn)=>{
        if(err) console.log(err);
        var q="SELECT * FROM order_table WHERE  ( cashback_received IS NULL AND order_id="+mysql.escape(order_id)+" )";
        console.log(q);
        conn.query(q,(err2,res)=>{
            if(err2) console.log(err2);
            console.log(res);
            if(res.length==1){

                var cashback=res[0].cashback;
                var cashback_for_items=res[0].cashback_for_items;
                var total_cashback=parseFloat(cashback)+parseFloat(cashback_for_items);
                var user_id=res[0].user_id;
                var cashback_received=res[0].cashback_received;
                if(total_cashback>0){
                    var q2="SELECT wallet FROM userlist WHERE user_id="+mysql.escape(user_id);
                    console.log(q2);
                    conn.query(q2,(err3,res3)=>{
                        if(err3) console.log(err3);
                        if(res3.length==1){
                            var wallet_point=res3[0].wallet;
                            wallet_point=parseFloat(wallet_point)+parseFloat(total_cashback);
                            var q3="UPDATE userlist SET wallet="+mysql.escape(wallet_point)+" WHERE user_id"+mysql.escape(user_id);
                           console.log(q3);
                            conn.query(q3,(err4,res4)=>{
                                if(err4) console.log(err4);
                                if(res4.affectedRows==1){
                                    console.log(` ${total_cashback} Cashback added.Now wallet point ${wallet_point}`);
                                    var transaction_id=uniqid('trans-');
                                    var type="credit";
                                    var date=new Date();
                                    var q4="INSERT INTO wallet_transaction (transaction_id,user_id, order_id ,amount,type,timestamp) VALUES ("+mysql.escape(transaction_id)+","+mysql.escape(user_id)+","+mysql.escape(order_id)+","+mysql.escape(total_cashback)+","+mysql.escape(type)+","+mysql.escape(date);
                                    console.log(q4);
                                    conn.query(q4,(err5,res5)=>{
                                        if(err5) console.log(err5);
                                        if(res5.affectedRows==1){
                                            console.log("Trasaction added to the table");

                                            var q5="UPDATE order_table SET cashback_received="+mysql.escape("received")+" WHERE order_id="+mysql.escape(order_id);
                                            console.log(q5);
                                            conn.query(q5,(err6,res6)=>{
                                                if(err6) console.log(err6);
                                                if(res6.affectedRows==1){

                                                    console.log("Cashback given");
                                                    res2.send('Done');
                                                }

                                            });
                                            
                                            

                                        }
                                    });
                                }

                            });
                        }
                    });

                }
                



            }
        });
    });
    

});


router.get('/haha',(req,res)=>{

    console.log("haha");
    //res.send('Haaa');
    res.render('haha',{layout:false});
});

module.exports=router;