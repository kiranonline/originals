var mysql = require('mysql');
var path = require('path');
var uniqid = require('uniqid');
var pool = require(path.join(__dirname, '/connection.js'));

class items{
    constructor(item_id,item_name,item_type,no_of_items,size,color,price,image,cashback,delivery_charge){
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
        this.cashback=cashback;
        this.delivery_charge=delivery_charge;
        this.total_delivery_charge=parseInt(no_of_items)*parseInt(delivery_charge);
    }
}




function checkExistence(no_of_total_items_in_cart,req,stock,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,callback)
{
    console.log("checkExistence() called");
    
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["item_id"]==item_id)
        {
            if(cart_items_array[i]["size"]==size)
            {
                if(cart_items_array[i]["color"]==color)
                {    
                    console.log("item match found");
                    var no_of_items=cart_items_array[i]["no_of_items"]+1;
                    if(no_of_items>stock)
                    {
                        console.log("Out of stock");
                        return callback(1);
                    }
                    else{
                        cart_items_array[i]["no_of_items"]=no_of_items;
                        cart_items_array[i]["price"]=price;
                        cart_items_array[i]["cashback"]=cashback;
                        cart_items_array[i]["delivery_charge"]=delivery_charge;
                        cart_items_array[i]["total"]=parseInt(no_of_items)*parseInt(price);
                        cart_items_array[i]["total_delivery_charge"]=parseInt(no_of_items)*parseInt(delivery_charge);
                        no_of_total_items_in_cart++;
                        if(no_of_total_items_in_cart>5)
                        {
                            return callback(2);
                        }
                        var dict={"items":cart_items_array,"length":no_of_total_items_in_cart};

                        updateQuery(dict,req,function(){
                            console.log("updateQuery() callback");
                            console.log("no of items increased");
                            return callback(0);
                            
                        });
                        return;

                    }
                    
                    
                    
                }
            }
        }
        if(i==(cart_items_array.length-1)){
                console.log("State -->i==cart_items_array.length-1")
                if(stock==0)
                {
                    console.log("out of stock");
                    return callback(1);
                }
                else{
                    add(no_of_total_items_in_cart,req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,function(ans){
                        console.log("add() callback");
                        if(ans==2)
                        {
                            console.log("with value 2");
                            return callback(2);
                        }
                        else{
                            console.log("with value 0");
                            return callback(0);
                        }
            
                        
                    });
                    return;

                }
            
            
        }
    }
    console.log("state cart_items_array.length==0")
    if(stock==0)
    {
        console.log("out of stock");
        return callback(1);
    }
    else{
        add(no_of_total_items_in_cart,req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,function(ans){
            console.log("add() callback");
            if(ans==2)
            {
                console.log("with value 2");
                return callback(2);
            }
            else{
                console.log("with value 0");
                return callback(0);
            }
            
        
        });
        return;
    }
    
    console.log("checkExistence() end after ");
    

}





function  add(no_of_total_items_in_cart,req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,callback)
{    
    console.log("add callback()");
    var obj=new items(item_id,item_name,item_type,1,size,color,price,image,cashback,delivery_charge);
var dict={"id":obj.id,"item_id":obj.item_id,"item_name":obj.item_name,"item_type":obj.item_type,"no_of_items":obj.no_of_items,"size":obj.size,"color":obj.color,"price":obj.price,"total":obj.total,"image":obj.image,"cashback":obj.cashback,"delivery_charge":obj.delivery_charge,"total_delivery_charge":obj.total_delivery_charge};
    
    cart_items_array.push(dict); 
    no_of_total_items_in_cart++;
    if(no_of_total_items_in_cart>5)
    {
        console.log("cant add because already 5 item in cart");
        return callback(2);
    }   
    var dict={"items":cart_items_array,"length":no_of_total_items_in_cart};

    updateQuery(dict,req,function(){
        console.log("new item added to cart");
        console.log("updateQuery() callback");
        callback(1);
    });
                  
}









function remove(no_of_total_items_in_cart,req,id,cart_items_array,callback)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            var no_of_items=cart_items_array[i]["no_of_items"];
            cart_items_array.splice(i,1);                
            console.log(`no_of_total_items_in_cart=${no_of_total_items_in_cart}`);
            console.log(`no_of_items=${no_of_items}`);
            no_of_total_items_in_cart=no_of_total_items_in_cart-parseInt(no_of_items);
            var dict={"items":cart_items_array,"length":no_of_total_items_in_cart};
            var len=cart_items_array.length;
            updateQuery(dict,req,function(){
                console.log("item removed from cart");
                console.log('updateQuery() callback');
                return callback(len); 
            });
        }       
    }
}












//value is 1 always...do as per that
function increase_decrease(no_of_total_items_in_cart,req,stock,id,cart_items_array,value,callback)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            var no_of_items=cart_items_array[i]["no_of_items"];
            var total_no=parseInt(no_of_items)+parseInt(value);
            var total_price=0;
            var total_delivery_charge=0;
            var moreThan5=0;
            var outOfStock=0;
            var removingDueToOutOfStock=0;
            console.log(no_of_total_items_in_cart+"is greater than or equals 5 ==>"+((parseInt(no_of_total_items_in_cart)>=5)));
            if(total_no<=0)
            {
                no_of_total_items_in_cart+=parseInt(value);   //since value is always 1 .so this case is possible when no_of_times =1  
                console.log("no_of_items() is less than 0.Hence removed");
                cart_items_array.splice(i,1);
                total_no=0;
                total_price=0;
            }
            /*else if(total_no>5)
            {
                console.log("total no >5");
                cart_items_array[i]["no_of_items"]=no_of_items;
                total_no=no_of_items;
                total_price=total_no*parseInt(cart_items_array[i]["price"]);
                total_delivery_charge=total_no*parseInt(cart_items_array[i]["delivery_charge"]);
                moreThan5=1;
            }*/
            else if(parseInt(no_of_total_items_in_cart)>=5&&(value>0))
            {
                no_of_total_items_in_cart=no_of_total_items_in_cart;
                console.log("no_of_total_items_in_cart >5");
                cart_items_array[i]["no_of_items"]=no_of_items;
                total_no=no_of_items;
                total_price=total_no*parseInt(cart_items_array[i]["price"]);
                total_delivery_charge=total_no*parseInt(cart_items_array[i]["delivery_charge"]);
                moreThan5=1;
            }
            else if(total_no>stock)
            {
                console.log("total_no > stock");
                if(stock==0)
                {
                    no_of_total_items_in_cart=no_of_total_items_in_cart-parseInt(no_of_items);
                    console.log("stock =0");
                    cart_items_array.splice(i,1);
                    removingDueToOutOfStock=1;
                    total_no=0;
                    total_price=0;
                }
                else{
                    no_of_total_items_in_cart=no_of_total_items_in_cart-parseInt(no_of_items)+parseInt(stock);
                    total_no=stock;
                    total_price=total_no*parseInt(cart_items_array[i]["price"]);
                    total_delivery_charge=total_no*parseInt(cart_items_array[i]["delivery_charge"]);
                    cart_items_array[i]["total"]=total_price;
                    cart_items_array[i]["total_delivery_charge"]=total_delivery_charge;
                    outOfStock=1;
                }
            }
            else{
                no_of_total_items_in_cart=no_of_total_items_in_cart+parseInt(value);
                cart_items_array[i]["no_of_items"]=total_no;
                total_price=total_no*parseInt(cart_items_array[i]["price"]);
                total_delivery_charge=total_no*parseInt(cart_items_array[i]["delivery_charge"]);
                cart_items_array[i]["total"]=total_price;
                cart_items_array[i]["total_delivery_charge"]=total_delivery_charge;
            }
            var dict={"items":cart_items_array,"length":no_of_total_items_in_cart};
            updateQuery(dict,req,function(){
                console.log('updateQuery() callback');
                return callback(total_price,total_no,moreThan5,outOfStock,removingDueToOutOfStock,cart_items_array.length);
            });
                    
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
    callback(sum);
}







function getTotalDeliveryCharge(cart_items_array,callback)
{
    var sum=0;
    for(var i=0;i<cart_items_array.length;i++)
    {
        var delivery_charge=parseInt(cart_items_array[i]["delivery_charge"]);
        var no_of_items=parseInt(cart_items_array[i]["no_of_items"]);
        var x=delivery_charge*no_of_items;
        sum+=x;
    }
    callback(sum);
}








function getTotalCashback(cart_items_array,callback)
{
    var sum=0;
    for(var i=0;i<cart_items_array.length;i++)
    {
        var cashback=parseInt(cart_items_array[i]["cashback"]);
        var no_of_items=parseInt(cart_items_array[i]["no_of_items"]);
        var x=cashback*no_of_items;
        sum+=x;
    }
    callback(sum);
}








function updateQuery(dict,req,callback)
{
    console.log("updateQuery() called");
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="UPDATE  userlist SET cart="+mysql.escape(JSON.stringify(dict))+" WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(query,function(err2,result){
    
            if(err2) console.log(err2);
            if(result.affectedRows==1)
            {
                console.log("New Cart:\n");
                console.log(dict);
                callback();
            }
           
        });
        conn.release();

    });

    
    
}

exports.checkExistence=checkExistence;
exports.add=add;
exports.remove=remove;
exports.increase_decrease=increase_decrease;
exports.getTotalPrice=getTotalPrice;
exports.getTotalDeliveryCharge=getTotalDeliveryCharge;
exports.getTotalCashback=getTotalCashback;
