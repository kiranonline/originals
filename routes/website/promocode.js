var express=require('express');
var  router=express.Router();
var path = require('path');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var mysql=require('mysql');
var  cart_functionalities= require(path.join(__dirname,'/../../dependencies/cart_functionalities.js'));
var getTotalDeliveryCharge=cart_functionalities.getTotalDeliveryCharge;

router.post('/check',isLoggedIn,function(req,res){

    pool.getConnection(function(err,conn){
        if(err) console.log(err);
        var q="SELECT * from userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
        conn.query(q,function(err2,res2){
        if(err2) console.log(err2);

        if(res2.length==1)
        {
            var wallet_point=parseFloat(res2[0].wallet);
            var cart=JSON.parse(res2[0].cart);
            var cart_items_array=cart["items"];

            var delivery_charge;
            getTotalDeliveryCharge(cart_items_array,function(sum){
                console.log("getTotalDeliveryCharge() callback");
                delivery_charge=sum;
            });
            var query="SELECT * FROM promocode WHERE promocode="+mysql.escape(req.body.name);
            conn.query(query,function(err,result){
                if(err) console.log(err);

                if(result.length==1)
                {
                    var x=req.body.totalPrice;
                    var TotalPrice=parseFloat(x);
                    var percentage=parseFloat(result[0].percentage);
                    var upto=parseFloat(result[0].upto);
                    var type=result[0].type;
                    var net_amount=TotalPrice;
                    if(type=="discount")
                    {
                        var discount_amount=TotalPrice*percentage/100;
                        if(discount_amount>upto)
                        discount_amount=upto;
                        net_amount=TotalPrice-discount_amount;
                        res.send({net_amount:net_amount,delivery_charge:delivery_charge,success:"discount"});
                        return;
                    }
                    else if(type=="wallet_point")
                    {
                        var discount_amount=TotalPrice*percentage/100;
                        if(discount_amount>upto)
                        discount_amount=upto;
                        if(discount_amount>wallet_point)
                        discount_amount=wallet_point;
                        net_amount=TotalPrice-discount_amount;
                        res.send({net_amount:net_amount,delivery_charge:delivery_charge,wallet_point:discount_amount,success:"wallet_point"});
                        return ;
                    }
                    else{
                        var discount_amount=TotalPrice*percentage/100;
                        if(discount_amount>upto)
                        discount_amount=upto;
                        res.send({success:"cashback",cashback:discount_amount});
                        return;
                    }
                }
                else{
                    
                    res.send({success:"false"});
                    return;
                }
            });
        }
        else{
            console.log("invalid user");
            res.redirect('/');
        }

        });
        conn.release();
    });
        
});






module.exports=router;