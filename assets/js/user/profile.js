$(document).ready(function(){

    //gender select
    $('select').formSelect();



    //enable-edit
    


    //password chnaging modal
    $('.modal').modal();




    


 
 
	//enable-edit for address
	
	
	
	
	
	
	$('.modal').modal({height:200});
	
    //$('select').formSelect();
    








    












    //validate form
    $("#new_address").validate({

        rules: {
            contact:{
                required: true,
                number:true,
                minlength:10,
                maxlength:10
            },
            landmark: {
                required: true,
            },
            add:{
                required: true,
            }
        },
        //For custom messages
        messages: {
            contact:{
                required: "Please enter your phone number !",
                minlength: "Enter a valid phone number !",
                maxlength: "Enter a valid phone number !"
            },
           landmark:{
                required: "Please enter your password !"
            },
            add:{
                required:'Please enter the address !'
            }
        },
        errorElement : 'div',
        errorPlacement: function(error, element) {
          var placement = $(element).data('error');
          if (placement) {
            $(placement).append(error)
          } else {
            error.insertAfter(element);
          }
        }
     });
	
	







});