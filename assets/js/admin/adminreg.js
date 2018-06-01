$(function(){


    $("#loginform").validate({

    rules: {
        phone:{
            required: true,
            number:true,
            minlength:10,
            maxlength:10
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    //For custom messages
    messages: {
        phone:{
            required: "Please enter your phone number",
            minlength: "Enter a valid phone number",
            maxlength: "Enter a valid phone number"
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
        phone:{
            required: true,
            number:true,
            minlength:10,
            maxlength:10
        },
        dob:{
            required: true
        },
        password2: {
            required: true,
            minlength: 6
        },
        password2_confirm:{
            required: true,
            minlength: 6,
            equalTo:'#password2'
        }
    },
    //For custom messages
    messages: {
        phone:{
            required: "Please enter your phone number",
            minlength: "Enter a valid phone number",
            maxlength: "Enter a valid phone number"
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


 
});