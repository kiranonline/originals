var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var uniqid=require('uniqid');


class items{
    constructor(item_id,no_of_items,size,color,price,image){
        this.id=uniqid('cart-');
        this.item_id=item_id;
        this.no_of_items=no_of_items;
        this.size=size;
        this.color=color;
        this.price=price;
        this.image=image;
    }
}

router.get('/user/cart',isLoggedIn,(req,res)=>{

    var query="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
    conn.query(query,function(err,result){
        if(err) console.log(err);

        var cart=JSON.parse(result[0]['cart']);

        console.log(cart);
        var cart_items_array=cart["items"];


        res.render('cart/cartpage.handlebars',{cart:cart_items_array});
    });

});


router.get('/cart',isLoggedIn,(req,res)=>{



    res.render('cart/itemsAdd.handlebars');
});

router.post('/cart/add',isLoggedIn,function(req,res){
    
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

            checkExistence(req,item_id,size,color,price,image,cart_items_array);

            });
        }
    });
    res.send("hello");
});

router.post('/cart/remove',isLoggedIn,(req,res)=>{

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

    });
    res.send("hello");
});
router.post('/cart/change',isLoggedIn,(req,res)=>{

    var query="SELECT * FROM items WHERE id="+mysql.escape(req.body.item_id);
    conn.query(query,(err,res)=>{
        if(err) console.log(err);

        if(res.length==1)
        {
            var price=res[0].price;
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
                increase_decrease(req,id,cart_items_array,value);

            });
        }
    });
    res.send("hello");
});

router.post('/cart/total',isLoggedIn,(req,res)=>{

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
});

function checkExistence(req,item_id,size,color,price,image,cart_items_array)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["item_id"]==item_id)
        {
            if(cart_items_array[i]["size"]==size)
            {
                if(cart_items_array[i]["color"]==color)
                {    
                    console.log("increase no_of_items");            
                    
                    var no_of_items=cart_items_array[i]["no_of_items"]+1;
                    cart_items_array[i]["no_of_items"]=no_of_items;
                    cart_items_array[i]["price"]=price;
                    
                    var dict={"items":cart_items_array};


                    updateQuery(dict,req)
                    return;
                }
            }
        }
    };
    add(req,item_id,size,color,price,image,cart_items_array);
}

//item_id,no_of_items,size,color,price,image
function  add(req,item_id,size,color,price,image,cart_items_array)
{
    
    console.log("new itam added");
    var obj=new items(item_id,1,size,color,price,image);
var dict={"id":obj.id,"item_id":obj.item_id,"no_of_items":obj.no_of_items,"size":obj.size,"color":obj.color,"price":obj.price,"image":obj.image};
    
    cart_items_array.push(dict);    
    var dict={"items":cart_items_array};

    updateQuery(dict,req);
                  
}



function remove(req,id,cart_items_array)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            console.log("items removed");
            cart_items_array.splice(i,1);                
            var dict={"items":cart_items_array};
            
            updateQuery(dict,req);
            return;           
        }       
    }
}
function increase_decrease(req,id,cart_items_array,value)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            console.log("No of items increased by "+value);
            var no_of_items=cart_items_array[i]["no_of_items"];
            var total_no=parseInt(no_of_items)+parseInt(value);

            if(total_no<=0)
            {
                console.log("no of pieces is less than 0")
                cart_items_array.splice(i,1);
            }
            else{
    
                cart_items_array[i]["no_of_items"]=total_no;
            }

            var dict={"items":cart_items_array};
            updateQuery(dict,req);
            return;        
        }        
    }
}
function getTotalPrice(cart_items_array)
{
    var sum=0;
    for(var i=0;i<cart_items_array.length;i++)
    {
        var price=parseInt(cart_items_array[i]["price"]);
        var no_of_items=parseInt(cart_items_array[i]["no_of_items"]);
        var x=price*no_of_items;
        sum+=x;
    }
   // console.log("Total Price "+sum);
    return sum;
}


function updateQuery(dict,req)
{
    console.log("New Cart:\n");
    console.log(dict);

    var query="UPDATE  userlist SET cart='"+JSON.stringify(dict)+"' WHERE phone='"+req.session.passport["user"]+"'";
    conn.query(query,function(err,result){

        if(err) throw err

        console.log("Data Updated in the cart column");
        
    });
}







module.exports = router;