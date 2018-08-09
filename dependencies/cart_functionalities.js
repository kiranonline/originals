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
    }
}

function checkExistence(req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge,callback)
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
                    cart_items_array[i]["cashback"]=cashback;
                    cart_items_array[i]["delivery_charge"]=delivery_charge;
                    
                    
                    cart_items_array[i]["total"]=parseInt(no_of_items)*parseInt(price);
                    var dict={"items":cart_items_array};

                    updateQuery(dict,req,function(){
                        console.log("updateQuery() callback");
                    });
                    return callback();
                }
            }
        }
    };
    add(req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge);
}

function  add(req,item_id,item_name,item_type,size,color,price,image,cart_items_array,cashback,delivery_charge)
{
    
    console.log("new itam added");
    var obj=new items(item_id,item_name,item_type,1,size,color,price,image,cashback,delivery_charge);
var dict={"id":obj.id,"item_id":obj.item_id,"item_name":obj.item_name,"item_type":item_type,"no_of_items":obj.no_of_items,"size":obj.size,"color":obj.color,"price":obj.price,"total":obj.total,"image":obj.image,"cashback":cashback,"delivery_charge":delivery_charge};
    
    cart_items_array.push(dict);    
    var dict={"items":cart_items_array};

    updateQuery(dict,req,function(){

        console.log("updateQuery() callback");
    });
                  
}



function remove(req,id,cart_items_array,callback)
{
    for(var i=0;i<cart_items_array.length;i++)
    {
        if(cart_items_array[i]["id"]==id)
        {
            console.log("items removed");
            cart_items_array.splice(i,1);                
            var dict={"items":cart_items_array};
            var len=cart_items_array.length;
            updateQuery(dict,req,function(){
                console.log('updateQuery() callback');
            });
            return callback(len);           
        }       
    }
}
function increase_decrease(req,id,cart_items_array,value,callback)
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
                console.log("no_of_items() is less than 0.Hence removed");
                cart_items_array.splice(i,1);
            }
            else{
                cart_items_array[i]["no_of_items"]=total_no;
                total_price=total_no*parseInt(cart_items_array[i]["price"]);
                cart_items_array[i]["total"]=total_price;
            }
            var dict={"items":cart_items_array};
            updateQuery(dict,req,function(){
                console.log('updateQuery() callback');
            });
            return callback(total_price);        
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


function updateQuery(dict,req,callback)
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
            if(result.affectedRows==1)
            {
                console.log("Data Updated in the cart column");
            }
            else{
                console.log("Data Not updated");
            }
        });
        conn.release();

    });

    return callback();
    
}

exports.checkExistence=checkExistence;
exports.add=add;
exports.remove=remove;
exports.increase_decrease=increase_decrease;
exports.getTotalPrice=getTotalPrice;
