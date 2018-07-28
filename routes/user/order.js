var express=require('express');
var router=express.Router();
var uniqid=require('uniqid');
var fs=require('fs');
var path=require('path');
var distance = require('google-distance-matrix');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));



var api_key="";

distance.key(api_key);


router.get('/order',function(req,res){

    res.render('orderpage.handlebars');
});

router.post('/order',function(req,res){


    fs.readFile(path.join(__dirname+'/../../dependencies/deliverycharges.json'),function(err1,result){

        if(err1) throw err1




        //console.log(result.toString());
        var text=result.toString();
        var json=JSON.parse(text);

        
        
        
        //console.log(json);

        
        
        var address=req.body.address;
        var total_amount=req.body.total_amount;
        var delivery_distance;

        var delivery_charge;
        var net_amount=req.body.net_amount;
        var promocode_id=req.body.promocode_id;
        var phone_no=req.body.phone_no;





 
        var origins = ['22.991364,88.4466487'];
        var destinations = [address];
     

        distance.matrix(origins, destinations, function (err, distances) {
            if (!err)
                console.log(distances);
            
            if(distances.rows[0].elements[0].status=='OK')    
            {
                delivery_distance=parseInt(distances.rows[0].elements[0].distance.text);
                console.log(delivery_distance);


                for(keys in json)
                {
                    if(delivery_distance<=parseInt(keys))
                    {
                        delivery_charge=json[keys];
                        console.log("delivery_charge "+delivery_charge);
                        break;
                    }
                }
                var order_id=uniqid('order-');
                var dict={};
                var cart=JSON.parse(req.session.cart);
                dict["order_id"]=order_id;
                dict["items"]=cart["items"];
                dict["address"]=address;
                dict["total_amount"]=total_amount;
                dict["delivery_charge"]=delivery_charge;
                dict["net_amount"]=net_amount;
                dict["promocode_id"]=promocode_id;
                dict["phone_no"]=phone_no;

                console.log(dict);


                var ordered_by="RK";
                var ordered_on=new Date();

var query="INSERT INTO order_details (order_id,details,ordered_by,ordered_on) VALUES ('"+order_id+"','"+JSON.stringify(dict)+"','"+ordered_by+"','"+ordered_on+"')";
//console.log(query);
 

                conn.query(query,function(error,result){


                    if(error ) throw error

                    console.log("order details inserted into the table successfully");

                });
                res.send("order");


            }
        });
    });
});



module.exports=router;