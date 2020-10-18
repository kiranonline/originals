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
            locality:{
                required:true
            },
            city:{
                required:true
            },
            state:{
                required:true
            },
            pin:{
                required: true,
                minlength:6,
                maxlength:6
            }
        },
        //For custom messages
        messages: {
            contact:{
                required: "Please enter your phone number !",
                minlength: "Enter a valid phone number !",
                maxlength: "Enter a valid phone number !"
            },
            locality:{
                required:true
            },
            city:{
                required:true
            },
            state:{
                required:"Please enter the state"
            },
            pin:{
                required:"Invalid pin code"
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