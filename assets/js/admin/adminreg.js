$(function(){

    $("#login-modal").click(()=>{
       $("#func").toggle();
    });
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
        phone2:{
            required: true,
            number:true,
            minlength:10,
            maxlength:10
        },
        dob:{
            required: true
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



});