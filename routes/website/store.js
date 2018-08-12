var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var SendPushNotification = require(path.join(__dirname, '/../../dependencies/pushnotification.js'));





//fetching homepage
router.get('/', function (req, res) {
    console.log('I am');
    var q1 = "SELECT * FROM carousel_main";
    var carouseldata, card_, tee_, choco_;
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query(q1, function (err, result) {

            if (err) {
                console.log(err);
            }
            carouseldata = result;
            var q2 = "SELECT * FROM items WHERE type_name='T-shirt' AND status='active'";
            conn.query(q2, function (err, result) {
                if (err) {
                    console.log(err);
                }
                tee_=[];
                console.log(result);
                for(var i in result){
                    tee_.push({
                        id:result[i].id,
                        name:result[i].name,
                        price:result[i].price,
                        cashback:result[i].cashback,
                        effective_price:result[i].price-result[i].cashback,
                        image:JSON.parse(result[i].images)['1']
                    });
                }
                var q3 = "SELECT * FROM items WHERE type_name='cards'";
                conn.query(q3, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    card_=[];
                    for(var i in result){
                        card_.push({
                            id:result[i].id,
                            name:result[i].name,
                            price:result[i].price,
                            cashback:result[i].cashback,
                            effective_price:result[i].price-result[i].cashback,
                            image:JSON.parse(result[i].images)['1']
                        });
                    }
                    
                    var q2 = "SELECT * FROM items WHERE type_name='chocolate'";
                    conn.query(q2, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        choco_=[];  
                        for(var i in result){
                            choco_.push({
                                id:result[i].id,
                                name:result[i].name,
                                price:result[i].price,
                                cashback:result[i].cashback,
                                effective_price:result[i].price-result[i].cashback,
                                image:JSON.parse(result[i].images)['1']
                            });
                        }
                        console.log(tee_,card_,choco_);
                        res.render('homepage.handlebars', {
                            nonce: req.nonce,
                            carousel: carouseldata,
                            tee: tee_,
                            card: card_,
                            choco: choco_
                        });
                    });
                });
            });
        });
        conn.release();
    });
});








//fetch item
router.get("/item/:itemId", function (req, res) {
    var itemId = req.params.itemId;
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1 = "SELECT * FROM items WHERE id=" + mysql.escape(itemId)+" AND status='active'";
        conn.query(q1, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                if (result.length == 1) {
                    console.log(result);
                    var size_id = result[0].size_id;
                    var color_id=result[0].color_id;
                    var q2 = "SELECT * FROM item_category_level1 WHERE id=" + mysql.escape(size_id);
                    conn.query(q2, function (err, result1) {
                        if (err) {
                            console.log(err);
                        } else {
    
                                
                                var q3 = "SELECT * FROM color WHERE id=" + mysql.escape(color_id);
                                console.log(q3);
                                conn.query(q3, function (err, result2) {
                                    if (err) {
                                        console.log('I am\n');
                                        console.log(err);
                                    } else {
                                        if (result1.length == 1) {
                                            var sizes = JSON.parse(result1[0].size);
                                            var colors = JSON.parse(result2[0].color) || null;
                                            console.log(colors);
                                            var gender = {};
                                            var image = JSON.parse(result[0].images);
                                            if (result[0].gender == "Both") {
                                                gender = {1:"male", 2:"female"};
                                            } else if (result[0].gender == "Male") {
                                                gender = {1:"male"};
                                            } else if (result[0].gender == "Female") {
                                                gender = {1:"female"};
                                            } else {
                                                gender = [];
                                            }
                
                                            var item = {
                                                id: result[0].id,
                                                name: result[0].name,
                                                price: result[0].price,
                                                cashback:result[0].cashback,
                                                effective_price:result[0].price-result[0].cashback,
                                                sizes: sizes,
                                                colors:colors,
                                                gender: gender,
                                                type: result[0].type_name,
                                                event: result[0].event_name,
                                                image: image
                                            }
                
                                            //res.send(JSON.stringify(item));
                                            console.log(item);
                                            res.render('item/itempage',{item:item});
                
                                        } else {
                                            res.redirect('/');
                                        }
                                    }
                                });
    
                            
                        }
                    });
                } else {
                    res.redirect("/");
                }
            }
    
        });
        conn.release();
    });
    
});















router.get('/products/all',(req,res)=>{
    
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT * FROM items WHERE status='active'";
        conn.query(q1,(err,result)=>{
            if(err){
                console.log(err);
            }
            items=[];  
            for(var i in result){
                items.push({
                    id:result[i].id,
                    name:result[i].name,
                    price:result[i].price,
                    cashback:result[i].cashback,
                    effective_price:result[i].price-result[i].cashback,
                    image:JSON.parse(result[i].images)['1']
                });
            }
            res.render('searchpage/search',{items:items});
        });
        conn.release();

    });
    
});


















router.post('/notification',(req,res)=>{
    console.log('i am called');
    const subscription = req.body;
    
    res.status(201).json({});

    const payload = JSON.stringify({title:'Welcome to The Originals',body:'How my we help you?'});

    SendPushNotification(subscription,payload,()=>{
        console.log('push sent');
    });


});






module.exports = router;