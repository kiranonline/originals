var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));
var uniqid=require('uniqid');


var  cart_functionalities= require(path.join(__dirname,'/../../dependencies/cart_functionalities.js'));
var checkExistence=cart_functionalities.checkExistence;
var add=cart_functionalities.add;
var remove=cart_functionalities.remove;
var increase_decrease=cart_functionalities.increase_decrease;
var getTotalPrice=cart_functionalities.getTotalPrice;


var deliveryCharge=40;

router.get('/cart',isLoggedIn,(req,res)=>{

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
        conn.query(query,function(err,result){
            if(err) console.log(err);

            var cart=JSON.parse(result[0]['cart']);
    
            console.log(cart);
            var cart_items_array=cart["items"];
    
            var btnEnable=false;
            if(cart_items_array.length>0)
            {
                btnEnable=true;
            }
    
            res.render('cart/cartpage.handlebars',{cart:cart_items_array,btnEnable:btnEnable});
        });
        conn.release();
    });
    
});


router.post('/cart/add',function(req,res){
    console.log('i got');


if(!req.isAuthenticated()){
    
    req.session.oldUrl="/item/"+req.body.item_id;
    console.log(req.session.oldUrl);
    /*data={
        redirect:'/item/'+req.body.item_id
    }*/
    res.send("Not Logged In");
}
else{

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="SELECT * FROM items WHERE id="+mysql.escape(req.body.item_id);
        conn.query(query,function(err,result){
            if(err) console.log(err);
    
            if(result.length==1)
            {  
                console.log("available item");
                var item_id=req.body.item_id;
                var no_of_items=1;
                var size=req.body.size;
                var color=req.body.color;
                var price=result[0].price;
                var item_name=result[0].name;
                var item_type=result[0].type_name;
                var imageJSON=JSON.parse(result[0].images);
                var image=imageJSON["1"];
    
                var q="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
                console.log(q);
                conn.query(q,function(err2,result2){
    
                    if(err2) console.log(err2);
                    //console.log(result2[0]['cart']);
    
                    var cart=JSON.parse(result2[0]['cart']);
    
                    //console.log("Cart:");
                    //console.log(cart);
                    
                    var cart_items_array=cart["items"];
                    //log(cart_items_array.length);
    
                //console.log("item_id: "+item_id+" no_of_items: "+no_of_items+" size: "+size+" color: "+color+" price: "+price+" image: "+image);
    
                checkExistence(req,item_id,item_name,item_type,size,color,price,image,cart_items_array);
    
                });
            }
        });
        res.send("hello");


        conn.release();


    });

}
    
    
});





















router.post('/cart/remove',isLoggedIn,(req,res)=>{


    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }

        var q="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
        console.log(q);
        conn.query(q,function(err2,result2){
    
            if(err2) console.log(err2);
    
            var id=req.body.id;
    
            //console.log(result2[0]['cart']);
    
            var cart=JSON.parse(result2[0]['cart']);
    
            //console.log("Cart:");
            //console.log(cart);
            var cart_items_array=cart["items"];
            //log(cart_items_array.length);
    
            //console.log("item_id: "+item_id+" no_of_items: "+no_of_items+" size: "+size+" color: "+color+" price: "+price+" image: "+image);
            remove(req,id,cart_items_array);
            res.send("remove");
    
        });
        //res.send("hello");
        //res.redirect('/user/cart');

        conn.release();


    });

    
});













router.post('/cart/change',isLoggedIn,(req,res)=>{

    console.log("change");

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="SELECT * FROM items WHERE id="+mysql.escape(req.body.item_id);
        conn.query(query,(err,res2)=>{
            if(err) console.log(err);
    
            if(res2.length==1)
            {
                var price=res2[0].price;
                var id=req.body.id;
                var value=req.body.value;
    
                var q="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
                console.log(q);
                conn.query(q,function(err2,result2){
                    if(err2) console.log(err2);
    
                    //console.log(result2[0]['cart']);
                    var cart=JSON.parse(result2[0]['cart']);
    
                    //console.log("Cart:");
                    //console.log(cart);
                    var cart_items_array=cart["items"];
                    //log(cart_items_array.length);
    
                    //console.log("item_id: "+item_id+" no_of_items: "+no_of_items+" size: "+size+" color: "+color+" price: "+price+" image: "+image);
                    var total_price=increase_decrease(req,id,cart_items_array,value);
    
                    res.send({total_price:total_price});
                });
            }
        });
    conn.release();    


    });
    
});















router.post('/cart/total',isLoggedIn,(req,res)=>{


    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
        console.log(q);
        conn.query(q,function(err2,result2){
            if(err2) console.log(err2);
    
            //console.log(result2[0]['cart']);
            var cart=JSON.parse(result2[0]['cart']);
    
            //console.log("Cart:");
            //console.log(cart);
            var cart_items_array=cart["items"];
            //log(cart_items_array.length);
    
            //console.log("item_id: "+item_id+" no_of_items: "+no_of_items+" size: "+size+" color: "+color+" price: "+price+" image: "+image);
            var x=getTotalPrice(cart_items_array);
    
            console.log("total price "+x);
              
        });
        res.send("hello");

        conn.release();

    });
        
   
});













module.exports = router;