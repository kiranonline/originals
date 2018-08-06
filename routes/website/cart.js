var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var passport = require(path.join(__dirname,'/../../dependencies/passportlogin.js'));
var uniqid=require('uniqid');



var deliveryCharge=40;
class items{
    constructor(item_id,item_name,item_type,no_of_items,size,color,price,image){
        this.id=uniqid('cart-');
        this.item_id=item_id;
        this.item_name=item_name;
        this.item_type=item_type;
        this.no_of_items=no_of_items;
        this.size=size;
        this.color=color;
        this.price=price;
        this.total=parseInt(no_of_items)*parseInt(price);
        this.image=image;
    }
}

router.get('/order',isLoggedIn,(req,res)=>{

    var query="SELECT cart FROM userlist WHERE phone="+mysql.escape(req.session.passport["user"]);
    conn.query(query,function(err,result){
        if(err) console.log(err);

        var cart=JSON.parse(result[0]['cart']);

        console.log(cart);
        var cart_items_array=cart["items"];

        
        var TotalPrice;
        getTotalPrice(cart_items_array,function(sum){
            TotalPrice=sum;
        });
        var TotalPriceWithDeliveryCharge=parseInt(TotalPrice)+deliveryCharge;

        var q1="SELECT * FROM address WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q1,(err2,res1)=>{
            if(err2){
                console.log(err2);
            }
            console.log(res1);
            res.render('cart/orderpage.handlebars',{cart:cart_items_array,address:res1,TotalPrice:TotalPrice,TotalPriceWithDeliveryCharge:TotalPriceWithDeliveryCharge});
        });
    });

});


router.post('/order/place',isLoggedIn,function(req,res){

    var address_id=req.body.address_id;

    poll.getConnection(function(err,conn){

        if(err) console.log(err);

        var order_id=uniqid('order-');
        var user_phone=req.session.passport["user"];
        var items;
        var total_price;
        var promocode=req.body.promocode;
        var discount;
        var cashback;
        var net_amount;
        var delivery_charge;
        var net_amount_with_delivery_charge;
        var address;
        var address_contact;
        var date=new Date();
        var order_status="pending";
        var payment_status="pending";
        
        var q="SELECT cart FROM userlist WHERE phone="+mysql.escape(user_phone);
        conn.query(q,function(err2,res2){
            if(err2) console.log(err2);

            if(res2.length==1)
            {            

                items=res2[0].cart;//var

                var x=JSON.parse(items);
                var cart_items_array=x["items"];

                getTotalPrice(cart_items_array,function(sum){
                    total_price=sum;
                });
                var q2="SELECT * FROM promocode WHERE promocode="+mysql.escape(promocode);
                conn.query(q2,function(err3,res3){
                    if(err3) console.log(err3);
                    if(res3.length==1)
                    {

                        var percentage=parseFloat(res3[0].percentage);
                        var upto=parseFloat(res3[0].upto);
                        var type=res3[0].type;

                        if(type=="discount")
                        {
                            var discount_amount=total_price*percentage/100;
                            if(discount_amount>upto)
                            discount_amount=upto;

                            discount=discount_amount;//var
                            cashback=0;//var
                            net_amount=total_price-discount;//var
                        }
                        else if(type=="cashback")
                        {
                            var discount_amount=total_price*percentage/100;
                            if(discount_amount>upto)
                            discount_amount=upto;

                            discount=0 ;//var
                            cashback=discount_amount;//var
                            net_amount=total_price;//var
                        }
                    }
                    else{
                        discount=0;
                        cashback=0;
                        net_amount=total_price;
                    }

                    delivery_charge=deliveryCharge;
                    net_amount_with_delivery_charge=net_amount+delivery_charge;


                    var q3="SELECT * FROM address WHERE id="+mysql.escape(address_id);
                    conn.query(q3,function(err4,res4){

                        if(err4) console.log(err4);

                        if(res4.length==1)
                        {
                            address=res4[0].address;
                            address_contact=res4[0].contact;
                        }
                        else{
                            res.status(404).render('404page');
                            return;
                        }

                        //console.log("order_id: "+order_id);
                        //console.log("User:  "+user_phone);
                        //console.log("items: "+items);
                        //console.log("total price: "+total_price);
                        //console.log("Promocode: "+promocode);
                        //console.log("Discount: "+discount );
                        //console.log("Cashback: "+cashback);
                        //console.log("Net Amount: "+net_amount);
                        //console.log("Delivery charge: "+delivery_charge);
                        //console.log("Net Amount With Delivery Charge: "+net_amount_with_delivery_charge);
                        //console.log("Address: "+address);
                        //console.log("Address Contact: "+address_contact);
                        var q4="INSERT INTO temp_order (id,user_phone,items,total_price,promocode,discount,cashback,net_amount,delivery_charge,net_amount_with_delivery_charge,address,address_contact,date,order_status,payment_status) VALUES ("+mysql.escape(order_id)+","+mysql.escape(user_phone)+","+mysql.escape(items)+","+mysql.escape(total_price)+","+mysql.escape(promocode)+","+mysql.escape(discount)+","+mysql.escape(cashback)+","+mysql.escape(net_amount)+","+mysql.escape(delivery_charge)+","+mysql.escape(net_amount_with_delivery_charge)+","+mysql.escape(address)+","+mysql.escape(address_contact)+","+mysql.escape(date)+","+mysql.escape(order_status)+","+mysql.escape(payment_status)+")";
                        console.log(q4);                        
                        conn.query(q4,function(err5,res5){
                            if(err4) console.log(err5);
                            console.log("inserted");


                        });


                    });


                    


            });

        }
        else
        {
            res.status(404).render('404page');
        }



        });

    

        

        conn.end();

    });
    res.send("place order");

});

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
    
    
            res.render('cart/cartpage.handlebars',{cart:cart_items_array});
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
                    increase_decrease(req,id,cart_items_array,value);
    
                    res.send("changed");
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









function checkExistence(req,item_id,item_name,item_type,size,color,price,image,cart_items_array)
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
                    
                    cart_items_array[i]["total"]=parseInt(no_of_items)*parseInt(price);
                    var dict={"items":cart_items_array};


                    updateQuery(dict,req)
                    return;
                }
            }
        }
    };
    add(req,item_id,item_name,item_type,size,color,price,image,cart_items_array);
}

//item_id,no_of_items,size,color,price,image
function  add(req,item_id,item_name,item_type,size,color,price,image,cart_items_array)
{
    
    console.log("new itam added");
    var obj=new items(item_id,item_name,item_type,1,size,color,price,image);
var dict={"id":obj.id,"item_id":obj.item_id,"item_name":obj.item_name,"item_type":item_type,"no_of_items":obj.no_of_items,"size":obj.size,"color":obj.color,"price":obj.price,"total":obj.total,"image":obj.image};
    
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

            var total_price=0;
            if(total_no<=0)
            {
                console.log("no of pieces is less than 0")
                cart_items_array.splice(i,1);
            }
            else{
    
                cart_items_array[i]["no_of_items"]=total_no;
                total_price=total_no*parseInt(cart_items_array[i]["price"]);
                cart_items_array[i]["total"]=total_price;
            }

            var dict={"items":cart_items_array};
            updateQuery(dict,req);
            return total_price;        
        }        
    }
}
function getTotalPrice(cart_items_array,callback)
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
     callback(sum);
}


function updateQuery(dict,req)
{
    console.log("New Cart:\n");
    console.log(dict);

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }

        var query="UPDATE  userlist SET cart='"+JSON.stringify(dict)+"' WHERE phone='"+req.session.passport["user"]+"'";
        conn.query(query,function(err,result){
    
            if(err) throw err
    
            console.log("Data Updated in the cart column");
            
        });


        conn.release();


    });

    
}







module.exports = router;