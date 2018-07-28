var express=require('express');
var router=express.Router();
var path = require('path');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var uniqid = require('uniqid');



class items{
    constructor(id,item_id,no_of_items,size,color,price){
        this.id=uniqid('cart-');
        this.item_id=item_id;
        this.no_of_items=no_of_items;
        this.size=size;
        this.color=color;
        this.price=price;
       
    }
}

function checkExistence(req,item_id,size,price,color,cart_items_array)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["item_id"]==item_id)
        {
            if(cart_items_array[i]["size"]==size)
            {
                if(cart_items_array[i]["color"]==color)
                {                
                    var no_of_items=cart_items_array[i]["no_of_items"]+1;
                    cart_items_array[i]["no_of_items"]=no_of_items;
                    var dict={"items":cart_items_array};
                    console.log(dict);
                    req.session.cart=JSON.stringify(dict);

                var query="UPDATE  cart SET details='"+JSON.stringify(dict)+"' WHERE user_id='"+item_id+"'";
                    conn.query(query,function(err,result){

                        if(err) throw err

                        console.log("Data Updated in the cart table");
                        
                    });
                    return;
                }
            }
        }
    };
    add(req,item_id,size,price,color,cart_items_array);
}

function  add(req,item_id,size,price,color,cart_items_array)
{
    var obj=new items(0,item_id,1,size,color,price);
var dict={"id":obj.id,"item_id":obj.item_id,"no_of_items":obj.no_of_items,"size":obj.size,"color":obj.color,"price":obj.price};
    cart_items_array.push(dict);
    console.log("no of items in cart "+cart_items_array.length);
    var dict={"items":cart_items_array};
    console.log(dict);
    req.session.cart=JSON.stringify(dict);

    var query="UPDATE  cart SET details='"+JSON.stringify(dict)+"' WHERE user_id='item1'";
    conn.query(query,function(err,result){

        if(err) throw err

        console.log("New data inserted to the cart table");
        return;
    });                    
}

router.get('/cart',function(req,res){
    res.render("cartpage.handlebars");
});


function remove(req,id,cart_items_array)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            cart_items_array.splice(i,1);                
            console.log("no of items in cart "+cart_items_array.length);
            var dict={"items":cart_items_array};
            console.log(dict);
            req.session.cart=JSON.stringify(dict);

            var query="UPDATE  cart SET details='"+JSON.stringify(dict)+"' WHERE user_id='item1'";
            conn.query(query,function(err,result){

                if(err) throw err

                console.log("item removed  from the cart table");
            });
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
            console.log(dict);
            req.session.cart=JSON.stringify(dict);

            var query="UPDATE  cart SET details='"+JSON.stringify(dict)+"' WHERE user_id='item1'";
            conn.query(query,function(err,result){

                if(err) throw err

                console.log("No of items changed in the cart table");
            });
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
    console.log("Total Price "+sum);
    return ;
}


router.post('/cart/total',function(req,res){
    if(!req.session.admin){
        res.render('adminloginpage.handlebars',{error:''});
    }
    else{
        
    var cart=JSON.parse(req.session.cart);

    console.log(cart);
    console.log("haha");
    var cart_items_array=cart["items"];

    console.log("get total amount page");
    getTotalPrice(cart_items_array);
    res.send("hello");

    }
    



});


router.post('/cart/change',function(req,res){
    if(!req.session.admin){
        res.render('adminloginpage.handlebars',{error:''});
    }
    else{

    var cart=JSON.parse(req.session.cart);

    console.log(cart);
    var cart_items_array=cart["items"];

    var id=req.body.id;
    var value=req.body.value;
    console.log("id : "+id);
    increase_decrease(req,id,cart_items_array,value);
    res.send("hello");

    }
    


});

router.post('/cart/remove',function(req,res){

    if(!req.session.admin){
        res.render('adminloginpage.handlebars',{error:''});
    }
    else{

    var cart=JSON.parse(req.session.cart);

    console.log(cart);
    var cart_items_array=cart["items"];

    var id=req.body.id;

    console.log("id : "+id);
    remove(req,id,cart_items_array);
    res.send("hello");

    }
    


});
router.post('/cart/add',function(req,res){

    if(!req.session.admin){
        res.render('adminloginpage.handlebars',{error:''});
    }
    else{

    var cart=JSON.parse(req.session.cart);
    //console.log(cart);
    var cart_items_array=cart["items"];

    var item_id=req.body.item_id;
    var size=req.body.size;
    var price=req.body.price;
    var color=req.body.color;


    console.log("item_id : "+item_id+" size : "+size+" price : "+price+" color : "+color);
    checkExistence(req,item_id,size,price,color,cart_items_array);
    res.send("hello");

    }
});












module.exports=router;