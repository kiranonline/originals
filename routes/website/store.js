var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');




//fetching homepage
router.get('/', function (req, res) {
    var q1 = "SELECT * FROM carousel_main";
    var carouseldata, card_, tee_, choco_;
    conn.query(q1, function (err, result) {

        if (err) {
            console.log(err);
        }
        carouseldata = result;
        var q2 = "SELECT * FROM items WHERE type_name='T-shirt'";
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




});








//fetch item
router.get("/item/:itemId", function (req, res) {
    var itemId = req.params.itemId;
    var q1 = "SELECT * FROM items WHERE id=" + mysql.escape(itemId);
    conn.query(q1, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length == 1) {
                console.log(result);
                var size_id = result[0].size_id;
                var q2 = "SELECT * FROM item_category_level1 WHERE id=" + mysql.escape(size_id);
                conn.query(q2, function (err, result1) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result1.length == 1) {
                            var sizes_json = JSON.parse(result1[0].size);
                            var sizes_array = [];
                            var gender = [];
                            for (var key in sizes_json) {
                                sizes_array.push(sizes_json[key]);
                            }
                            if (result[0].gender == "Both") {
                                gender = ["male", "female"];
                            } else if (result[0].gender == "Male") {
                                gender = ["male"];
                            } else if (result[0].gender == "Female") {
                                gender = ["female"];
                            } else {
                                gender = [];
                            }

                            var item = {
                                id: result[0].id,
                                name: result[0].name,
                                price: result[0].price,
                                sizes: sizes_array,
                                gender: gender,
                                type: result[0].type_name,
                                event: result[0].event_name
                            }

                            res.send(JSON.stringify(item));

                        } else {
                            res.redirect('/');
                        }
                    }
                });
            } else {
                res.redirect("/");
            }
        }

    });
});

































module.exports = router;