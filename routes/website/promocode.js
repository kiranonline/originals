var express=require('express');
var  router=express.Router();
var path = require('path');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
var mysql=require('mysql');


var deliveryCharge=40;
router.get('/view',function(req,res){

    res.send("haha");
});

router.post('/check',isLoggedIn,function(req,res){

    pool.getConnection(function(err,conn){
        var query="SELECT * FROM promocode WHERE promocode="+mysql.escape(req.body.name);
        conn.query(query,function(err,result){

            if(err) console.log(err);

            if(result.length==1)
            {
                var x=req.body.totalPrice;
                //console.log(x);
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

                    //console.log(net_amount);
                }

                res.send({net_amount:net_amount,deliveryCharge:deliveryCharge,success:"true"});
            }
            else{
                
                res.send({success:"false"});
            }

        });
        conn.release();
    });

    


});




module.exports=router;