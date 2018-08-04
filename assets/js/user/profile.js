$(document).ready(function(){

    //gender select
    $('select').formSelect();



    //enable-edit
    $('#activate-edit').on('click',function(){
        /*$('.editable').removeAttr("disabled");
        $('.submit-button').removeClass('hide');
        $('#gender').formSelect();*/
        M.Modal.getInstance($('#passwordchange')).open();
    });


    //password chnaging modal
    $('.modal').modal();




    var pages = ["#personaldetails","#addresssection","#referalsection","#myordersection"]
    var page_controllers =[".openpersonaldetails",".openaddresssection",".openreferalsection",".openmyordersection"];
    //initiating page changing function
    function alterpage(activebutton,activepage){
        var array_len = pages.length;
       for(var i=0;i<array_len;i++){
           $(pages[i]).css('display','none');
           $(page_controllers[i]).removeClass('active-menu');
       }
       $(activepage).css('display','block');
       $(activebutton).addClass('active-menu');
    }
    

    $(".openpersonaldetails").on("click",function(){
        alterpage(".openpersonaldetails",'#personaldetails');
    });
    $(".openaddresssection").on("click",function(){
        alterpage(".openaddresssection","#addresssection");
    });
    $(".openreferalsection").on("click",function(){
        alterpage(".openreferalsection","#referalsection");
    });
    $(".openmyordersection").on("click",function(){
        alterpage(".openmyordersection","#myordersection");
    });



    //initial setup
    alterpage(".openpersonaldetails","#personaldetails");


 
 
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