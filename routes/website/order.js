var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var makePayment = require(path.join(__dirname, '/../../dependencies/payment.js'));
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var uniqid=require('uniqid');
var  cart_functionalities= require(path.join(__dirname,'/../../dependencies/cart_functionalities.js'));
var getTotalPrice=cart_functionalities.getTotalPrice;
var getTotalDeliveryCharge=cart_functionalities.getTotalDeliveryCharge;
var getTotalCashback=cart_functionalities.getTotalCashback;
router.get('/order',isLoggedIn,(req,res)=>{

    pool.getConnection(function(error,conn){
if(error) console.log(error);
    var query="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
    conn.query(query,function(err,result){
        if(err) console.log(err);
        
        if(result.length==1)
        {
            var cart=JSON.parse(result[0]['cart']);
            console.log(cart);
            var cart_items_array=cart["items"];
            if(cart_items_array.length==0)
            {
                res.redirect('/');
                return;
            }
            else{
                var TotalPrice;
                var TotalDeliveryCharge;
                getTotalPrice(cart_items_array,function(sum){
                    TotalPrice=sum;
                });
                getTotalDeliveryCharge(cart_items_array,function(sum){
                    TotalDeliveryCharge=sum;
                });
                var total_amount=parseInt(TotalPrice)+parseInt(TotalDeliveryCharge);
                var q1="SELECT * FROM address WHERE user_id="+mysql.escape(req.session.passport["user"]);
                conn.query(q1,(err2,res1)=>{
                    if(err2){
                        console.log(err2);
                    }
                    if(res1.length==1)
                    {
                        console.log(res1);
                        res.render('cart/orderpage.handlebars',{cart:cart_items_array,address:res1,TotalPrice:TotalPrice,TotalDeliveryCharge:TotalDeliveryCharge,total_amount:total_amount});
                    }
                    else{
                        res.redirect('/');
                        return;
                    }
                });
            }
        }
        else{
            res.redirect('/');
            return;
        }
    });
    conn.release();
});
});


router.post('/order/place',isLoggedIn,function(req,res){
    var address_id=req.body.address_id;
    pool.getConnection(function(err,conn){

        if(err) console.log(err);

        var order_id=uniqid('order-');
        var user_phone=req.session.passport["user"];
        var items;
        var total_price;
        var promocode=req.body.promocode;
        var discount;
        var cashback;
        var used_wallet_point;
        var cashback_for_items;
        var net_amount;
        var delivery_charge;
        var net_amount_with_delivery_charge;
        var address;
        var address_contact;
        var date=new Date();
        var order_status="pending";
        var payment_status="pending";
        var buyer_name;
        var email;
        var wallet_point;
        
        var q="SELECT * FROM userlist WHERE phone="+mysql.escape(user_phone);
        conn.query(q,function(err2,res2){
            if(err2) console.log(err2);

            if(res2.length==1)
            {            
                buyer_name=res2[0].name;
                email=res2[0].email;
                items=res2[0].cart;
                wallet_point=res2[0].wallet;
                var x=JSON.parse(items);
                var cart_items_array=x["items"];
                getTotalPrice(cart_items_array,function(sum){
                    total_price=sum;
                });
                getTotalDeliveryCharge(cart_items_array,function(sum){
                    delivery_charge=sum;
                });
                getTotalCashback(cart_items_array,function(sum){
                    cashback_for_items=sum;
                });
                var q2="SELECT * FROM promocode WHERE promocode="+mysql.escape(promocode);
                conn.query(q2,function(err3,res3){
                    if(err3) console.log(err3);
                    if(res3.length==1)
                    {

                        var percentage=parseFloat(res3[0].percentage);
                        var upto=parseFloat(res3[0].upto);
                        var type=res3[0].type;

                        if(type=="discount")
                        {
                            var discount_amount=total_price*percentage/100;
                            if(discount_amount>upto)
                            discount_amount=upto;

                            used_wallet_point=0;
                            discount=discount_amount;//var
                            cashback=0;//var
                            net_amount=total_price-discount;//var
                        }
                        else if(type=="cashback")
                        {
                            var discount_amount=total_price*percentage/100;
                            if(discount_amount>upto)
                            discount_amount=upto;

                            used_wallet_point=0;
                            discount=0 ;//var
                            cashback=discount_amount;//var
                            net_amount=total_price;//var
                        }
                        else if(type=="wallet_point"){
                            var discount_amount=total_price*percentage/100;
                            if(discount_amount>upto)
                            discount_amount=upto;
                            if(discount_amount>wallet_point)
                            discount_amount=wallet_point;


                            used_wallet_point=discount_amount;
                            discount=0;
                            cashback=0;
                            net_amount=total_price-discount_amount;
                        }
                    }
                    //end if promocode valid
                    else{
                        promocode="";
                        discount=0;
                        cashback=0;
                        used_wallet_point=0;
                        net_amount=total_price;

                    }
                    //end if promocode invalid

                    net_amount_with_delivery_charge=net_amount+delivery_charge;
                    var q3="SELECT * FROM address WHERE id="+mysql.escape(address_id)+" && user_id="+mysql.escape(user_phone);
                    conn.query(q3,function(err4,res4){
                        if(err4) console.log(err4);

                        if(res4.length==1)
                        {
                            address=res4[0].address;
                            address_contact=res4[0].contact;
                        }
                        //end  if address valid
                        else{
                            res.redirect('/');
                            return;
                        }
                        //end  if address not valid
                        var q4="INSERT INTO temp_order (id,user_phone,items,total_price,promocode,discount,cashback,used_wallet_point,cashback_for_items,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status) VALUES ("+mysql.escape(order_id)+","+mysql.escape(user_phone)+","+mysql.escape(items)+","+mysql.escape(total_price)+","+mysql.escape(promocode)+","+mysql.escape(discount)+","+mysql.escape(cashback)+","+mysql.escape(used_wallet_point)+","+mysql.escape(cashback_for_items)+","+mysql.escape(net_amount)+","+mysql.escape(delivery_charge)+","+mysql.escape(net_amount_with_delivery_charge)+","+mysql.escape(address)+","+mysql.escape(address_contact)+","+mysql.escape(date)+","+mysql.escape(order_status)+","+mysql.escape(payment_status)+")";
                        console.log(q4);                        
                        conn.query(q4,function(err5,res5){
                            if(err5) console.log(err5);
                            console.log("data inserted in temporary table");
                            makePayment(res,order_id,"online shopping",net_amount_with_delivery_charge,user_phone,buyer_name,email,function(){
                                console.log("makePayment() callback");
                            });
                            
                        });
                        //end insert query
                    });
                    //end get address query
            });
            //end promocode query

        }
        //end  if user exists
        else
        {
            res.redirect('/');
            return;
        }
        //end  if user does not exist
        });
        //end  get user details
        conn.release();

    });
    //end get pool connection 
});



module.exports = router;
