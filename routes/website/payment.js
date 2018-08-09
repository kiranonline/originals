var express=require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var router=express.Router();


router.post('/admin/order/placed/success',function(req,res){

    console.log("web hook");
    console.log(req.body.payment_request);

var q="INSERT INTO "+mysql.escape(req.body.payment_id)+" "+mysql.escape(req.body.status)+" "+mysql.escape(req.body.longurl)+" "+mysql.escape(req.body.amount)+" "+mysql.escape(req.body.fees)+" "+mysql.escape(req.body.buyer)+" "+mysql.escape(req.body.buyer_name)+" "+mysql.escape(req.body.buyer_phone)+" "+mysql.escape(req.body.payment_request_id)+" "+mysql.escape(req.body.mac);


});

router.get('/order/payment/success',function(req,res){

    pool.getConnection(function(err,conn){

        var q="SELECT * FROM order_table WHERE payment_id="+mysql.escape(req.query.payment_id)+" && payment_request_id="+mysql.escape(req.query.payment_request_id);
        conn.query(q,function(err,res2){
            if(err) console.log(err);

            if(res2.length==1)
            {
                var order_status=res2[0].order_status;
                var order_id=res2[0].order_id;
                var payment_id=res2[0].payment_id;
                var timestamp=res2[0].date;
                var total=res2[0].net_amount;
                var delivery_charge=res2[0].delivery_charge;
                var paid=res2[0].amount_paid;
                var items_all=JSON.parse(res2[0].items);
                var items=items_all["items"];

                res.render('cart/paymentsuccess',{order_status:order_status,order_id:order_id,payment_id:payment_id,timestamp:timestamp,total:total,delivery_charge:delivery_charge,paid:paid,items:items});

            }
            else{
                res.status(404);
            }
            

        });

    });
});

module.exports=router;
