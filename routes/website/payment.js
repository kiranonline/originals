var express=require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var setFields = require(path.join(__dirname, '/../../dependencies/invoice.js'));
var generateInvoice=setFields.setFields;
var router=express.Router();
var request= require('request');
var uniqid=require('uniqid');



router.get('/order/payment/success/:order_id',function(req,res){

	setTimeout(function(){

		console.log('front-->Waiting for order details');
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
					console.log('api responded');
					var payment_details=JSON.parse(response.body);
					var status=payment_details.payment["status"];
					console.log("front->status from api response "+status);
					
					payment_status_from_instamojoFunction(res,status,order_id,payment_id,function(){
						var q="UPDATE temp_order SET payment_status_from_instamojo="+mysql.escape(status)+" WHERE order_id="+mysql.escape(order_id);
						conn.query(q,function(err2,res2){
							if(err2) console.log(err2);
							if(res2.affectedRows==1)
							{
								console.log("front-->instamojo payment status updated in temp_order table");
								
							}
							conn.release();							
						});
					});				
				}
			});
			
		});


	},1000);
	
		
});


function payment_status_from_instamojoFunction(res,status,order_id,payment_id,callback)
{
	console.log("payment_status_from_instamojoFunction() called with status"+status);
	pool.getConnection(function(errr,conn){
		if(errr) console.log(errr);
	
		console.log("front-->payment_status_from_instamojoFunction() called");
		if(status=="Credit")
		{
			console.log(`status = ${status}`);
			var  q2="SELECT * FROM temp_order WHERE order_id="+mysql.escape(order_id);
			console.log(q2);
			conn.query(q2,function(err3,res3){
				if(err3) console.log(err3);
				console.log("length of payment_status from temp order"+res3.length);
				if(res3.length==1)
				{
					//means order_id valid

					var items_all=JSON.parse(res3[0].items);
					var items=items_all["items"];
					var date =res3[0].date;
					var total=res3[0].total_price;
					var delivery_charge=res3[0].delivery_charge;
					var net_amount=res3[0].net_amount;
					var amount_paid="??";
					if(res3[0].payment_status=='pending')
					{
						//payment_status from temp_order pending

						console.log('front-->payment_status in temp_order  ->pending');
						console.log("front--> pending +credit =processing");
						res.render('cart/paymentprocessing');
					    callback();
					}
				}	
				else
				{
					//invalid order_id or data moved to order_table
					var q="SELECT * FROM order_table WHERE order_id="+mysql.escape(order_id);
					console.log(q);
					conn.query(q,(errqq,resqq)=>{
						if(errqq) console.log(errqq);
						if(resqq.length==1)
						{
							//valid order_id
							var user_id=resqq[0].user_id;
							var order_id=resqq[0].order_id;
							//payment_id
							var items_all=JSON.parse(resqq[0].items);
							var items=items_all["items"];
							var total=resqq[0].total_price;
							var net_amount=resqq[0].net_amount;
							var delivery_charge=resqq[0].delivery_charge;
							var amount_paid=resqq[0].amount_paid;
							var date=resqq[0].date;
							var order_status=resqq[0].order_status;
							var payment_status=resqq[0].payment_status;
							if(order_status=='placed')
							{
								console.log("when order placed");
								var order_status_local="Order Placed";	
								res.render('cart/paymentsuccess',{order_status:order_status_local,order_id:order_id,payment_id:payment_id,date:date,items:items,total:total,net_amount:net_amount,delivery_charge:delivery_charge,amount_paid:amount_paid});				
							}
							else if(order_status=='contact')
							{
								console.log(`when order is in contact state`);
								res.render('cart/contactadmin');
							}	
							callback();
						}		
						else{
							res.status(404);
						}				
					});
				}		
			});
		}
		//end if status Credit
		else
		{
			console.log("front-->Payment failed..api gives failed response");
			var order_status_local="Order not placed due to unsuccessful payment";
			res.render('cart/paymentfailure');
			callback();
		}
	});	
}

router.post('/admin/order/placed/success/:order_id',function(req,res2){
	console.log("back-->webhook post request");
	var order_id=req.params.order_id;	
	pool.getConnection(function(err,conn){
		if(err) console.log(err);
		var q="SELECT * FROM temp_order WHERE order_id="+mysql.escape(order_id);
		console.log("back-->query for order details "+q);
		conn.query(q,function(err2,res){
			if(err2) console.log(err2);
			console.log("temp order details length ="+res.length);
			if(res.length==1)
			{
				var user_id=res[0].user_id;
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

				var order_status;
				var payment_status;
				
				var payment_status_from_instamojo=res[0].payment_status_from_instamojo;
				
				var status_var=req.body.status;
				var payment_id=req.body.payment_id;
				var longurl=req.body.longurl;
				var amount_paid=req.body.amount;
				var instamojo_fees=req.body.fees;
				var mac=req.body.mac;

				console.log("back--> from temp-->user_id= "+user_id);
				console.log("back--> from temp-->payment_status_from_instamojo= "+payment_status_from_instamojo);
				
				console.log(" webhook??status_var==> " +status_var);
				console.log(" webhook??amount_paid==> " +amount_paid);

				if(payment_status_from_instamojo=="Credit")
				{
					console.log("back-->case1");
					check(status_var,order_id,user_id,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status,payment_id,longurl,amount_paid,instamojo_fees,mac,function(){
						console.log("back-->When payment_status_from_instamojo==Credit");
						res2.send("done");
					});
				}
				//end   payment_status_from_instamojo=="Credit" case
				else if(payment_status_from_instamojo=="not_checked")
				{
					console.log("back-->case2")
					var headers = { 'X-Api-Key': 'test_da22573aae638ce3fcb53c15f4f', 'X-Auth-Token': 'test_a0e09af12f77bfc6acded07115c'}
					request.get(
					'https://test.instamojo.com/api/1.1/payments/'+payment_id+"/",
					{ headers: headers}, function(error, response, body){
						if(!error && response.statusCode == 200)
						{
							console.log("back--> api responded");
							var payment_details=JSON.parse(response.body);
							var status_from_instamojo=payment_details.payment["status"];
							console.log("status_from_instamojo ="+status_from_instamojo);
							if(status_from_instamojo=="Credit")
							{
								console.log("back-->status_from_instamojo"+status_from_instamojo);
								check(status_var,order_id,user_id,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status,payment_id,longurl,amount_paid,instamojo_fees,mac,function(){
									console.log("back-->When payment_status_from_instamojo==not_checked status_var==Credit & api response=Credit");
									res2.send("done");
								});

							}
							else{
								failed_conflict(status_var,order_id,order_status,payment_status,function(){
									console.log("back-->When payment_status_from_instamojo==not_checked & status_var=failed & api response=failed");
									res2.send("done");
								});

							}
						}
						//end if instamojo get request responds
						else{
							console.log("back-->api response X");
							failed_conflict(status_var,order_id,order_status,payment_status,function(){
								console.log("back-->When payment_status_from_instamojo==not_checked &  & api response=nothing");
								res2.send("done");
							});

						}
						//end if instamojo get request does not responds
					});
				}
				//end   payment_status_from_instamojo=="not_checked" case
				else{
					console.log("back-->case3");
					console.log("back-->payment_status_from_instamojo"+payment_status_from_instamojo);
					failed_conflict(status_var,order_id,order_status,payment_status,function(){
						console.log("back-->When payment_status_from_instamojo==failed");
						res2.send("done");
					});


				}
				//end   payment_status_from_instamojo=="failed" case
			}
			//end order details found
		});
		//end get order details from temp_order
		conn.release();
	});
	//end pool
});


function insertIntoOrderTable(order_id,user_id,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status,payment_id,longurl,amount_paid,instamojo_fees,mac,callback)								
{
	var wallet_point_was_to_use=used_wallet_point;
	pool.getConnection(function(err,conn){
		if(err) console.log(err);
		
		var q="SELECT * FROM userlist WHERE user_id="+mysql.escape(user_id);
		conn.query(q,function(errr,resu){
			if(errr) console.log(errr);
			if(resu.length==1){
				var wallet_point_now=parseInt(resu[0].wallet);
				var user_name=resu[0].name;
				console.log(`wallet_point_now=${wallet_point_now}`);
				if(wallet_point_now<parseInt(used_wallet_point))
				{
					console.log("You don't have enough wallet balance");
					console.log("please contact @RK");
					order_status="contact";
					wallet_point_was_to_use=used_wallet_point;
					used_wallet_point=wallet_point_now;
				}
				var q1="INSERT INTO order_table (order_id, user_id,items,total_price ,promocode,discount,cashback,used_wallet_point,wallet_point_was_to_use,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge, address,address_contact, date,order_status,payment_status,payment_id, longurl,amount_paid,instamojo_fees, mac) VALUES ("+mysql.escape(order_id)+","+mysql.escape(user_id)+","+mysql.escape(items)+","+mysql.escape(total_price)+","+mysql.escape(promocode)+","+mysql.escape(discount)+","+mysql.escape(cashback)+","+mysql.escape(used_wallet_point)+","+mysql.escape(wallet_point_was_to_use)+","+mysql.escape(cashback_for_items)+","+mysql.escape(net_amount)+","+mysql.escape(delivery_charge)+","+mysql.escape(net_amount_with_delivery_charge)+","+mysql.escape(address)+","+mysql.escape(address_contact)+","+mysql.escape(date)+","+mysql.escape(order_status)+","+mysql.escape(payment_status)+","+mysql.escape(payment_id)+","+mysql.escape(longurl)+","+mysql.escape(amount_paid)+","+mysql.escape(instamojo_fees)+","+mysql.escape(mac)+");";
				console.log(q1);				
				conn.query(q1,function(err3,res3){
					if(err3) console.log(err3);
					if(res3.affectedRows==1)
					{
						var items_all=JSON.parse(items);
						var items_array=items_all["items"];
						generateInvoice(user_name,order_id,items_array,total_price,net_amount,delivery_charge,amount_paid,order_status,function(){
							
							if(used_wallet_point>0)
							{
								var update_wallet_point=parseFloat(wallet_point_now)-parseFloat(used_wallet_point);
								var q3="UPDATE userlist SET wallet="+mysql.escape(update_wallet_point)+" WHERE user_id="+mysql.escape(user_id);
								console.log(q3);
								conn.query(q3,function(err3,res3){
									if(err3) console.log(err3);
									if(res3.affectedRows==1)
									{
										var transaction_id=uniqid('trans-');
										var type='Debit';
										let date=new Date();
										var qqq="INSERT INTO wallet_transaction (transaction_id,user_id, order_id ,amount,type,timestamp) VALUES ("+mysql.escape(transaction_id)+","+mysql.escape(user_id)+","+mysql.escape(order_id)+","+mysql.escape(used_wallet_point)+","+mysql.escape(type)+","+mysql.escape(date)+")";
										console.log(qqq);
										conn.query(qqq,(errqqq,resqqq)=>{
											if(errqqq) console.log(errqqq);
											if(resqqq.affectedRows==1){
												console.log("Transaction add to the table");
												deleteRowFromTempOrderTable(order_id,function(ans){
													if(ans==1)
													{
														emptyCart(user_id,function(ans){
															if(ans==1){
																console.log("cart is emptied");
															}
															console.log("row deleted from temp_order");
														});
														
													}
													
													conn.release();
													return callback(1);
												});
											}
										});
							
									}
								});
								//end  update wallet_point
							}
							else{
								deleteRowFromTempOrderTable(order_id,function(ans){
									if(ans==1)
									{
										emptyCart(user_id,function(ans){
											if(ans==1){
												console.log("cart is emptied");
											}
											console.log("row deleted from temp_order");
										});
										
									}
									
									conn.release();
									return callback(1);
								});

							}
							
								
							
						});
						//end generateInvoice()
					}
				});
			}
		});
	});
}

function updateTempOrderTable(order_id,payment_status,order_status,callback)
{
	pool.getConnection(function(err,conn){
		var q1="UPDATE temp_order SET payment_status="+mysql.escape(payment_status)+",order_status="+mysql.escape(order_status)+" WHERE order_id="+mysql.escape(order_id);		
		console.log(q1);				
		conn.query(q1,function(err3,res3)
		{
			if(err3) console.log(err3);
			if(res3.affectedRows==1)
			{
				conn.release();
				return callback(1);
			}
			else{
				conn.release();
				return callback(0);	
			}
		});
		
	});
}

function deleteRowFromTempOrderTable(order_id,callback){
	pool.getConnection(function(err,conn){
		var q1="DELETE FROM temp_order WHERE order_id="+mysql.escape(order_id);		
		console.log(q1);				
		conn.query(q1,function(err3,res3)
		{
			if(err3) console.log(err3);
			if(res3.affectedRows==1)
			{
				conn.release();
				return callback(1);
			}
			else{
				conn.release();
				return callback(0);	
			}
		});
		
	});
}


function check(status_var,order_id,user_id,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status,payment_id,longurl,amount_paid,instamojo_fees,mac,callback)
{
	if(status_var=='Credit')
	{
		console.log('back_function-->status_var'+status_var);
		payment_status="Credit";
		order_status='placed';
		console.log("order placed.");
		insertIntoOrderTable(order_id,user_id,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status,payment_id,longurl,amount_paid,instamojo_fees,mac,function(ans){
			if(ans==1)
				console.log("Data inserted in order table");
			return callback();
		});
	}
	else{
		console.log('back_function-->status'+status_var);
		payment_status="conflict";
		order_status='conflict';
		console.log('order_status is in conflict.');
		updateTempOrderTable(order_id,payment_status,order_status,function(ans){
			if(ans==1)
				console.log("Data updated in the temp_order");
			return callback();
		});

	}
	
}

function failed_conflict(status_var,order_id,order_status,payment_status,callback)
{
	if(status_var=='Credit')
	{
		console.log('back_function-->status'+status_var);
		payment_status="conflict";
		order_status='conflict';
		console.log('order_status is in conflict. ');
		updateTempOrderTable(order_id,payment_status,order_status,function(ans){
			if(ans==1)
				console.log("Data updated in the temp_order");
			else{
					console.log("Something happened wrong");
					console.log("data not updated in temp_order table");
			}
			return callback();
		});
	}
	else{
		console.log('back_function-->status'+status_var);
		payment_status="failed";
		order_status='not placed';
		console.log('order not placed');
		updateTempOrderTable(order_id,payment_status,order_status,function(ans){
			if(ans==1)
				console.log("Data updated in the temp_order");
			else{
					console.log("Something happened wrong");
					console.log("data not updated in temp_order table");
			}
			return callback();
		});
	}
}
function emptyCart(user_id,callback)
{
	var cart="{\"items\":[]}";
	pool.getConnection(function(err,conn){
		if(err)  console.log(err);
		var q="UPDATE  userlist SET cart="+mysql.escape(cart)+" WHERE user_id="+mysql.escape(user_id);
		conn.query(q,function(err2,res){
			if(err2) console.log(err2);
			if(res.affectedRows==1){
				conn.release();
				return callback(1);
			}
			else{
				conn.release();
				return callback(0);
			}

		});
	});
}


module.exports=router;
