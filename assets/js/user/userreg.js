$(function(){


    //media query
    if($(window).width()<768){
       $('.main-holder').removeClass('z-depth-1'); 
    }

    

$("#loginform").validate({

    rules: {
        email:{
            required: true,
            email:true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    //For custom messages
    messages: {
        email:{
            required: "Please enter a valid email",
            email:"Please enter a valid email"
        },
        password:{
            required: "Please enter your password",
            minlength: "Enter a valid password"
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
 





 $("#registerform").validate({

    rules: {
        first_name:{
            required: true,
        },
        last_name:{
            required: true,                        
        },
        email2:{
            required:true,
            email:true,
        },
        phone2:{
            required: true,
            number:true,
            minlength:10,
            maxlength:10
        },
        age:{
            required: true,
            minlength:2,
            maxlength:2 
        },
        address:{
            required: true,
            minlength:10
        },
        password2: {
            required: true,
            minlength: 6
        },
        password2_confirm:{
            required: true,
            equalTo:'#password2'
            
        }
    },
    //For custom messages
    messages: {
        phone2:{
            required: "Please enter your phone number",
            minlength: "Enter a valid phone number",
            maxlength: "Enter a valid phone number"
        },
        password2_confirm:{
            equalTo:'password and confirm do not match'
        },
        password2:{
            required: "Please enter your password",
            minlength: "Enter a valid password"
        },

        address:{
            minlength:'address too short'
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







//gorget password

$("#password_reset").validate({

    rules: {
        password1:{
            required: true,
            minlength: 6
        },
        password2: {
            required: true,
            minlength: 6,
            equalTo:'#password1'
        }
    },
    //For custom messages
    messages: {
        password1:{
            required: "Please enter your password",
            minlength: "Enter a valid password"
        },
        password2:{
            required: "Please enter your password",
            minlength: "Enter a valid password",
            equalTo:"Password and confirm password are not same"
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




 $("#send_reset_email").validate({

    rules: {
        email:{
            required: true,
            email:true,
        }
    },
    //For custom messages
    messages: {
        email:{
            required: "Please enter your email",
           email:"Please enter a valid email"
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





















$(document).ready(function(){


    
    $('.login-page-tabs').tabs();


    $('#dob').datepicker({format:'dd-mm-yyyy',minDate:new Date(1920,01,01),maxDate:new Date()});


    $('select').formSelect();



    






});
       