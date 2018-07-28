var express=require('express');
var router=express.Router();
var uniq=require('uniqid');
var path=require('path');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));

router.get('/promo',function(req,res){

    res.render('promocode.handlebars');

});
router.post('/promo',function(req,res){
    var promocode_id=uniq('promo-');
    var name=req.body.name;
    var percentage=req.body.percentage;
    var upto=req.body.upto;
    var type=req.body.type;
    var created_on=new Date();
    var created_by="RK";
var query="INSERT INTO promocode VALUES('"+promocode_id+"','"+name+"',"+percentage+","+upto+",'"+type+"','"+created_by+"','"+created_on+"')";
//console.log(query);
    conn.query(query,function(err,res){
        console.log("data inserted");
    });
    res.send("promocode");
});

router.post('/apply',function(req,res){
    var total_amount=parseFloat(req.body.total_amount);
    var promocode=req.body.promocode;
    var query="SELECT * FROM promocode WHERE name='"+promocode+"'";
    conn.query(query,function(err,result){
        if(err) throw err
        if(result.length==1)
        {
            console.log("Valid promocode");
            console.log(result[0]);

            var percentage=parseFloat(result[0].percentage);
            var upto=result[0].upto;
            var type=result[0].type;
            var no_of_times_used=parseInt(result[0].no_of_times_used)+1;

            if(type=='discount')
            {
                
                var q1="UPDATE promocode SET no_of_times_used="+no_of_times_used+" WHERE name='"+promocode+"'";
                conn.query(q1,function(err1,res1){
                    if(err1) throw err1
                    console.log("no_of_times_used increased in the table");
                });
                var discount_amount=total_amount*percentage/100;
                if(discount_amount>upto)
                discount_amount=upto;
                var net_amount=total_amount-discount_amount;
                console.log("Net amount "+net_amount);

                
            }
            else if(type=='cashback')
            {
                var q2="UPDATE promocode SET no_of_times_used="+no_of_times_used+" WHERE name='"+promocode+"'";
                conn.query(q2,function(err1,res1){
                    if(err1) throw err1
                    console.log("no_of_times_used increased in the table");
                });
                var cashback_amount=total_amount*percentage/100;
                if(cashback_amount>upto)
                cashback_amount=upto;      
                console.log("cashback "+cashback_amount+" added");
            }
            console.log("percentage:"+percentage+",upto:"+upto+",type:"+type);
        }
        else{
            console.log("Invalid promocode");
        }
    });
    res.send("apply");
});
module.exports=router;