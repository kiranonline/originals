$(function(){

    //new rules
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value.indexOf(" ") < 0 && value != ""; 
      }, "Space are not allowed");







//for adminnewcarouselpage

    $("#newcarouselform").validate({
        
        rules: {
            slider_name:{
                required: true,
                noSpace: true
            },
            slider_link:{
                required: true,
                noSpace: true
            },
            slider_image:{
                required: true,
                extension: "jpg|jpeg"
            }
        },
        //For custom messages
        messages: {
            slider_name:{
                required: "Please enter a name",
                noSpace: "No space is allowed"
            },
            slider_link:{
                required: "Please enter a link",
                noSpace: "No space is allowed"
            },
            slider_imag:{
                required: "Please select an image",
                extension:"Image must be in jpg format."
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
     


//for category1

$("#newsizeform").validate({
        
    rules: {
        cat_name:{
            required: true,
            minlength:4
        },
        
    },
    //For custom messages
    messages: {
        cat_name:{
            required: "Please enter a name",
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