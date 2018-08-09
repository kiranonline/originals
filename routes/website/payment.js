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


router.post('/admin/order/placed/success/:order_id',function(req,res2){
	console.log("web hook");
	console.log(req.body);
	var order_id=req.params.order_id;
	pool.getConnection(function(err,conn){
		if(err) console.log(err);
	console.log(order_id);	
		var q="SELECT * FROM temp_order WHERE id="+mysql.escape(order_id);
console.log(q);		
conn.query(q,function(err2,res){
			if(err2) console.log(err2);
		//	console.log(res);
			console.log(res[0]);
			if(res.length==1)
			{
				var user_phone=res[0].user_phone
				var items=res[0].items;
				var total_price=res[0].total_price;
				var promocode=res[0].promocode;
				var discount=res[0].discount;
				var cashback=res[0].cashback;
				var net_amount=res[0].net_amount;
				var delivery_charge=res[0].delivery_charge;
				var net_amount_with_delivery_charge =res[0].net_amount_with_delivery_charge;
				var address=res[0].address;
				var address_contact=res[0].address_contact;
				var date=new Date();
				var order_status="order placed"
				var payment_status=req.body.status;
				
				var payment_id=req.body.payment_id;
				var shorturl="haha"+req.body.shorturl;
				var longurl=req.body.longurl;
				var amount_paid=req.body.amount;
				var currency=req.body.currency;
				var instamojo_fees=req.body.fees;
				var mac=req.body.mac;
				var q1="INSERT INTO order_table VALUES ("+mysql.escape(order_id)+","+mysql.escape(user_phone)+","+mysql.escape(items)+","+mysql.escape(total_price)+","+mysql.escape(promocode)+","+mysql.escape(discount)+","+mysql.escape(cashback)+","+mysql.escape(net_amount)+","+mysql.escape(delivery_charge)+","+mysql.escape(net_amount_with_delivery_charge)+","+mysql.escape(address)+","+mysql.escape(address_contact)+","+mysql.escape(date)+","+mysql.escape(order_status)+","+mysql.escape(payment_status)+","+mysql.escape(payment_id)+","+mysql.escape(shorturl)+","+mysql.escape(longurl)+","+mysql.escape(amount_paid)+","+mysql.escape(currency)+","+mysql.escape(instamojo_fees)+","+mysql.escape(mac)+");";
console.log(q1);				
conn.query(q1,function(err3,res2)
				{
					if(err3) console.log(err3);
					console.log("data inserted in order table");
				});
			}
			else
			{
				console.log("lol lol");
				res2.status(404);
			}
		
		});
	});
});



module.exports=router;
