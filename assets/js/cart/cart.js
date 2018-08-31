$( document ).ready(function() {


        if($(window).width() <= 992){

            
               
                $('body').on("click",'.gotoaddress',function(){
                    $('.checkout-wrapper').html('<div class="b1 waves-effect waves-light gotocart"><h6 class="btn-inner y">GO BACK</h6></div><div class="b2  waves-effect waves-light  gotopayment"><h6 class="btn-inner y">PAYMENT DETAILS</h6></div>');
                    $("#addresssection").css("display","block");
                    $('#cartitemsection').css("display","none");
                    $("#billingsection").css("display","none");
                });
                
            

            $('body').on("click",'.gotocart',function(){
                $('.checkout-wrapper').html('<div class="checkout-wrapper-btn gotoaddress m"><h6 class="btn-inner">SELECT ADDRESS</h6></div>');
                $("#addresssection").css("display","none");
                $('#cartitemsection').css("display","block");
                $("#billingsection").css("display","none");
            });

            $('body').on("click",'.gotopayment',function(){
                $('.checkout-wrapper').html('<div class="b1 waves-effect waves-light gotoaddress "><h6 class="btn-inner y"> GO BACK</h6></div><div class="b2  waves-effect waves-light  makepaymentt" onclick="orderPlace()"><h6 class="btn-inner y">MAKE PAYMENT</h6></div>');
                $('#cartitemsection').css("display","none");
                $("#addresssection").css("display","none");
                $("#billingsection").css("display","block");
            });
        }
           

           
            //$("#billingsection").css();

    

  });