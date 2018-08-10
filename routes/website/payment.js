var express=require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var router=express.Router();
var request= require('request');



router.get('/order/payment/success:order_id',function(req,res){

	console.log('Waiting for order details');
	setTimeout(function() {
		pool.getConnection(function(err,conn){
			if(err) console.log(err);


			var payment_id=req.query.payment_id;
			var payment_request_id=req.query.payment_request_id;
			var order_id=req.params.order_id;

			var headers = { 'X-Api-Key': 'test_da22573aae638ce3fcb53c15f4f', 'X-Auth-Token': 'test_a0e09af12f77bfc6acded07115c'}
			request.get(
			'https://test.instamojo.com/api/1.1/payments/'+payment_id+"/",
			{ headers: headers}, function(error, response, body){
				if(!error && response.statusCode == 200)
				{
					var payment_details=JSON.parse(request.body);
					var status=payment_details.payment["status"];
					console.log(status);
					if(status=="Credit")
					{
					}
					else{

					}
					var q="INSERT INTO temp_order (payment_status_from_instamojo) VALUES ("+mysql.escape(status)+") WHERE order_id="+mysql.escape(order_id);
					conn.query(q,function(err2,res2){
						if(err2) console.log(err2);
						if(res2.affectedRows==1)
						{
							console.log("payment status updated in temp_order table");
						}
						else{
							console.log("Something is Wrong");
							res.redirect('/');
							return;
						}

					});
				}
			});

			res.send("success");
			/*
			var q="SELECT * FROM order_table WHERE payment_id="+mysql.escape(req.query.payment_id)+" && payment_request_id="+mysql.escape(req.query.payment_request_id);
			conn.query(q,function(err2,res2){
				if(err2) console.log(err2);
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
					res.res(404);
				}
			});
			*/
			conn.release();
		});

	}, 7000);

});


router.post('/admin/order/placed/success/:order_id',function(req,res2){
	var order_id=req.params.order_id;
	pool.getConnection(function(err,conn){
		if(err) console.log(err);
		var q="SELECT * FROM temp_order WHERE id="+mysql.escape(order_id);
		conn.query(q,function(err2,res){
			if(err2) console.log(err2);
			console.log(res[0]);
			if(res.length==1)
			{
				var user_phone=res[0].user_phone
				var items=res[0].items;
				var total_price=res[0].total_price;
				var promocode=res[0].promocode;
				var discount=res[0].discount;
				var cashback=res[0].cashback;
				var used_wallet_point=res[0].used_wallet_point;
				var cashback_for_items=res[0].cashback_for_items;
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
				var q1="INSERT INTO order_table VALUES ("+mysql.escape(order_id)+","+mysql.escape(user_phone)+","+mysql.escape(items)+","+mysql.escape(total_price)+","+mysql.escape(promocode)+","+mysql.escape(discount)+","+mysql.escape(cashback)+","+mysql.escape(used_wallet_point)+","+mysql.escape(cashback_for_items)+","+mysql.escape(net_amount)+","+mysql.escape(delivery_charge)+","+mysql.escape(net_amount_with_delivery_charge)+","+mysql.escape(address)+","+mysql.escape(address_contact)+","+mysql.escape(date)+","+mysql.escape(order_status)+","+mysql.escape(payment_status)+","+mysql.escape(payment_id)+","+mysql.escape(shorturl)+","+mysql.escape(longurl)+","+mysql.escape(amount_paid)+","+mysql.escape(currency)+","+mysql.escape(instamojo_fees)+","+mysql.escape(mac)+");";
				console.log(q1);				
				conn.query(q1,function(err3,res3)
				{
					if(err3) console.log(err3);
					if(res3.affectedRows==1)
					{
						console.log("data inserted in order table");
					}
					else{
						console.log("Something happened wrong");
						console.log("data not updated in order table");
					}
					
				});
			}
			else
			{
				res2.status(404);
			}
		});
		conn.release();
	});
});



module.exports=router;
