var express=require('express');
var mysql=require('mysql');
var router=express.Router();


router.post('/admin/order/placed/success',function(req,res){

    console.log("web hook");
    console.log(req.body.payment_request);

var q="INSERT INTO "+mysql.escape(req.body.payment_id)+" "+mysql.escape(req.body.status)+" "+mysql.escape(req.body.longurl)+" "+mysql.escape(req.body.amount)+" "+mysql.escape(req.body.fees)+" "+mysql.escape(req.body.buyer)+" "+mysql.escape(req.body.buyer_name)+" "+mysql.escape(req.body.buyer_phone)+" "+mysql.escape(req.body.payment_request_id)+" "+mysql.escape(req.body.mac);


});


module.exports=router;