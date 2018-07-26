var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
const fs =  require('fs');




//fetching homepage
router.get('/',function(req,res){

    fs.readFile(path.join(__dirname,'/../../dependencies/website.theme'), function(err, text) {
        if (err) throw err;
        var theme_data = JSON.parse(text.toString());
        var q1="SELECT * FROM carousel_main";
        conn.query(q1,function(err,result){
            if (err) throw err;
            var carousel_data = result;
            res.render('homepage.handlebars',{theme:theme_data,carousel:carousel_data,nonce:req.nonce,csrf:req.csrfToken()});
        });
      });

});










//fetch item
router.get("/item/:itemId",function(req,res){
    var itemId = req.params.itemId;
    var q1 = "SELECT * FROM items WHERE id="+mysql.escape(itemId);
    conn.query(q1,function(err,result){
        if(err){
            console.log(err)
        }
        else{
            if(result.length==1){
                console.log(result);
                var size_id=result[0].size_id;
                var q2 = "SELECT * FROM item_category_level1 WHERE id="+mysql.escape(size_id);
                conn.query(q2,function(err,result1){
                    if(err){
                        console.log(err);
                    }
                    else{
                       if(result1.length==1){
                            var sizes_json = JSON.parse(result1[0].size);
                            var sizes_array=[];
                            var gender=[];
                            for(var key in sizes_json){
                                sizes_array.push(sizes_json[key]);
                            }
                            if(result[0].gender=="Both"){
                                gender=["male","female"];
                            }
                            else if(result[0].gender=="Male"){
                                gender=["male"];
                            }
                            else if(result[0].gender=="Female"){
                                gender=["female"];
                            }
                            else{
                                gender=[];
                            }

                            var item = {
                                id : result[0].id,
                                name : result[0].name,
                                price : result[0].price,
                                sizes : sizes_array,
                                gender : gender,
                                type : result[0].type_name, 
                                event : result[0].event_name             
                            }

                            res.send(JSON.stringify(item));
                            
                       }
                       else{
                           res.redirect('/');
                       }
                    }
                });
            }
            else{
                res.redirect("/");
            }
        }
        
    });
});








//
























module.exports = router;
