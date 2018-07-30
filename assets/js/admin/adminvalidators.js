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
        for_type:{
            required:true
        }
        
    },
    //For custom messages
    messages: {
        cat_name:{
            required: "Please enter a name",
        },
        for_type:{
            required:'This field is empty, Create item type first'
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





 //for website theme

 $("#themechangeform").validate({
        
    rules: {
        primary_colour_1:{
            required: true
        },
        primary_colour_2:{
            required: true
        },
        secondary_colour_1:{
            required: true
        },
        secondary_colour_2:{
            required: true
        },
        image:{
            required: true,
            extension: "jpg|jpeg"
        }
    },
    //For custom messages
    messages: {
        primary_colour_1:{
            required: "Please enter a color code"
        },
        primary_colour_2:{
            required: "Please enter a color code"
        },
        secondary_colour_1:{
            required: "Please enter a color code"
        },
        secondary_colour_2:{
            required: "Please enter a color code"
        },
        image:{
            required: "Please select an image",
            extension:"This should be jpeg or jpg"
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
 







//new promocode

$("#newpromocode").validate({
        
    rules: {
        percentage:{
            required: true,
            minlength:1,
            maxlength:3
        },
        promocode:{
            required: true,
            minlength:3,
            maxlength:8
        },
        upto:{
            required:true
        }
        
    },
    //For custom messages
    messages: {
        percentage:{
            required: "Please enter a percentage",
            minlength:'Enter a valid percentage',
            maxlength:'Enter a valid percentage'
        },
        promocode:{
            required:'Please enter a value',
            maxlength:'Enter a valid code',
            minlength:'Enter a valid code'
        },
        upto:{
            required:'Please enter a value'
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