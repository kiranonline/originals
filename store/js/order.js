/* to add a new item
    1.create object for the item
    2.create adding to cart functionality
    3.create design for new item and change the function
    4.removing functionality


*/

var total=0;

$(document).ready(function(){




    var total=0;


    //creating item class
    class item{
        constructor(name,id,price){
            this.name=name;
            this.id=id;
            this.price=price;
        }
    }


    //creating objects for the item
    var card1 = new item('card1','1000','9000');
    var card2 = new item('card2','2000','900');
    var card3 = new item('card3','3000','90');



    //creating cart
    var cart=[];

//adding item to cart functionality
    //for item1
    $('#item1').click(function(){
        if($.inArray(card1.id,cart)>-1){
            alert("item already in the cart");
            console.log(cart);
        }
        else{
            cart.push(card1.id);
            console.log(cart);
            
        }
    });
    //for item2
    $('#item2').click(function(){
        if($.inArray(card2.id,cart)>-1){
            alert("item already in the cart");
            console.log(cart);

        }
        else{
            cart.push(card2.id);
            console.log(cart);
            
        }
    });
    //for item3
    $('#item3').click(function(){
        if($.inArray(card3.id,cart)>-1){
            alert("item already in the cart");
            console.log(cart);
        }
        else{
            cart.push(card3.id);
            console.log(cart);
            
        }
    });




    //cart design

    $('#cartopen').click(function(){
        createCart(cart);      
    });




    //function design

    var createCart=function(cart){
        emptyCart(cart);
        console.log(cart);
        if(cart.length==0){
            $('#current-cart').html('<h3>Cart is Empty</h3>') 
        }
        else{
            cart.forEach(function(item,index) {
                console.log(cart);
                if(item==card1.id){
                    //insert 1st card
                    $('#current-cart').append("<div class='itm'><div class='row'><div class='col-md-4'><img src='stock/dummy.png' class='imggm'></div><div class='col-md-8'><p><span class='price-cut'><i class='fa fa-inr' aria-hidden='true'></i>10000 </span><span class='p1'><i class='fa fa-inr' aria-hidden='true'></i>9000</span></p><p class='card-name1'>Card1</p><button id='rmv1' class='btn btn-danger'>Remove Item</button></div></div></div>");

                }
                else if(item==card2.id){
                    //insert second card
                    $('#current-cart').append("<div class='itm'><div class='row'><div class='col-md-4'><img src='stock/dummy.png' class='imggm'></div><div class='col-md-8'><p><span class='price-cut'><i class='fa fa-inr' aria-hidden='true'></i>1000 </span><span class='p1'><i class='fa fa-inr' aria-hidden='true'></i>900</span></p><p class='card-name1'>Card2</p><button id='rmv2' class='btn btn-danger'>Remove Item</button></div></div></div>");
                }
                else{
                    //insert 3rd card
                    $('#current-cart').append("<div class='itm'><div class='row'><div class='col-md-4'><img src='stock/dummy.png' class='imggm'></div><div class='col-md-8'><p><span class='price-cut'><i class='fa fa-inr' aria-hidden='true'></i>100 </span><span class='p1'><i class='fa fa-inr' aria-hidden='true'></i>90</span></p><p class='card-name1'>Card3</p><button id='rmv3' class='btn btn-danger'>Remove Item</button></div></div></div>");

                }
                
            });
    }
}



    //empty cart

    var emptyCart=function(cart){
        $('#current-cart').html(''); 
    }





    //removing items from cart
    $(document).on('click','#rmv1',function(){
        var tempindex = cart.indexOf(card1.id);
        cart.splice(tempindex, 1);
        emptyCart(cart);
        createCart(cart);
        console.log(cart);
    });

    $(document).on('click','#rmv2',function(){
        var tempindex = cart.indexOf(card2.id);
        cart.splice(tempindex, 1);
        emptyCart(cart);
        createCart(cart);
        console.log(cart);
    });

    $(document).on('click','#rmv3',function(){
        var tempindex = cart.indexOf(card3.id);
        cart.splice(tempindex, 1);
        emptyCart(cart);
        createCart(cart);
        console.log(cart);
    });




    //closing current popup and opening buying popup

    $('#buy').click(function(){
        $('#closeB').trigger("click");
        $('#byeopen').trigger("click");
        emptyBye(cart);
        total=createByeTable(cart);
        total=applyPromo(total);
    });



    
    var emptyBye=function(cart){
        $('#price-list').html('');
        $('#gtotal').html('');
        total=0;
        $('#code').val('');
        $('#promo-msg').html('');
        
    }

    //invoice table
    var createByeTable=function(cart){
        var tempTotal=0;
        cart.forEach(function(item,index) {
            if(item==card1.id){
                //insert 1st card
                $('#price-list').append('<tr><td>'+card1.id+'</td><td>'+card1.name+'</td><td>'+card1.price+'</td></tr>');
                tempTotal=tempTotal+parseInt(card1.price);                
            }
            else if(item==card2.id){
                //insert second card
                $('#price-list').append('<tr><td>'+card2.id+'</td><td>'+card2.name+'</td><td>'+card2.price+'</td></tr>');
                tempTotal=tempTotal+parseInt(card2.price);
            }
            else{
                //insert 3rd card
                $('#price-list').append('<tr><td>'+card3.id+'</td><td>'+card3.name+'</td><td>'+card3.price+'</td></tr>');
                tempTotal=tempTotal+parseInt(card3.price);
            }
            
        });
        $('#gtotal').html(tempTotal);
        return tempTotal;

    }





    //apply promo
    var applyPromo=function(total){
        $('#promoclick').click(function(){
            var code = $('#code').val();
            if(code=='0000'){
                total=parseFloat('0.9')*parseFloat(total);
                $('#promo-msg').html('<p style="color:green;">Promo Code accepted! total price :'+total+'</p>')
            }
            else{
                $('#promo-msg').html('<p style="color:red;">Invalid Promo Code</p>');
            }
        });
        return total;
    }




    $('#cut').click(function(){
        $('#notice').css({"display":"none"})
    });

});



