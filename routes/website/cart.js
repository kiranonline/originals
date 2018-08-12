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
var remove=cart_functionalities.remove;
var increase_decrease=cart_functionalities.increase_decrease;
var getTotalPrice=cart_functionalities.getTotalPrice;


router.get('/cart',isLoggedIn,(req,res)=>{

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="SELECT cart FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(query,function(err,result){
            if(err) console.log(err);
            if(result.length==1)
            {
                console.log(result[0]);
                var cart=JSON.parse(result[0]["cart"]);
                console.log(cart);
                var cart_items_array=cart["items"];
                var btnEnable=false;
                if(cart_items_array.length>0)
                {
                    btnEnable=true;
                }
                res.render('cart/cartpage.handlebars',{cart:cart_items_array,btnEnable:btnEnable});
            }
            else{
                console.log('invalid user');
                res.redirect('/');
            }
            
        });
        conn.release();
    });
    
});














router.post('/cart/add',function(req,res){

if(!req.isAuthenticated()){
    
    req.session.oldUrl="/item/"+req.body.item_id;
    console.log(req.session.oldUrl);
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

                var cashback=result[0].cashback;
                var delivery_charge=result[0].delivery_charge;
    
                var q="SELECT cart FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
                conn.query(q,function(err2,result2){
    
                    if(err2) console.log(err2);
                    if(result2.length==1)
                    {
                        var cart=JSON.parse(result2[0]['cart']);
                        var cart_items_array=cart["items"];
                        checkExistence(req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,function(){
                           console.log("checkExistence() callback"); 
                           res.send("done");
                        });
                        
                    }
                    else{
                        console.log('invalid user');
                       // res.send('invalid');
                    }
                });
            }
            else{
                
                console.log('invalid item');
              //  res.send('invalid');
            }
        });
        conn.release();
    });
}
        
});










router.post('/cart/remove',isLoggedIn,(req,res)=>{

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q="SELECT cart FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q,function(err2,result2){
    
            if(err2) console.log(err2);
    
            if(result2.length==1)
            {
                var id=req.body.id;    
                var cart=JSON.parse(result2[0]['cart']);
                var cart_items_array=cart["items"];
                var len;
                remove(req,id,cart_items_array,function(length){
                    console.log("remove() callback");
                    len=length;
                    res.send({done:"done",length:len});
                });
                
            }
            else{
                console.log('invalid user');
                res.send({done:'invalid',length:len});
            }
        });
        conn.release();
    }); 
});

router.post('/cart/change',isLoggedIn,(req,res)=>{

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="SELECT * FROM items WHERE id="+mysql.escape(req.body.item_id);
        conn.query(query,(err3,res2)=>{
            if(err3) console.log(err3);
            if(res2.length==1)
            {
                var price=res2[0].price;
                var id=req.body.id;
                var value=req.body.value;
    
                var q="SELECT cart FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
                conn.query(q,function(err2,result2){
                    if(err2) console.log(err2);
                        
                    if(result2.length==1)
                    {
                        var cart=JSON.parse(result2[0]['cart']);
                        var cart_items_array=cart["items"];
                        var total_price;
                        var no_of_items;
                        increase_decrease(req,id,cart_items_array,value,function(total,no){
                            console.log('increase_decrease() callback');
                            total_price=total;
                            no_of_items=no;
                            res.send({done:'done',total_price:total_price,no_of_items:no_of_items});
                        });
                        
                    }
                    else{
                        console.log('invalid user');
                        res.send({done:'invalid'});
                    }
                   
                });
            }
            else{
                console.log('invalid item');
                res.send({done:'invalid'});
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
        var q="SELECT cart FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q,function(err2,result2){
            if(err2) console.log(err2);

            if(result2.length==1)
            {
                var cart=JSON.parse(result2[0]['cart']);
                var cart_items_array=cart["items"];
                var x;
                getTotalPrice(cart_items_array,function(total){
                    x=total;
                    console.log("total price "+x);
                    res.send("hello");
                });
                
            }
            else{
                console.log('invalid user');
                conn.release();
                res.redirect('/');
                return;
            }
        });
        
        conn.release();
    });
});

module.exports = router;
