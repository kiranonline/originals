$( document ).ready(function() {
    
    //search auto complete
    $('input.autocomplete').autocomplete({
        data: {
          "Apple": 'Apple',
          "Microsoft": 'Microsoft',
          "Google": 'https://placehold.it/250x250',
          "Yo":"yo"
        },
      });




      //media query
      if($(window).width() <= 992){
          
        //enable search bar inmobile view 
        $('#mobile-search').removeClass('hidden');

        //enable nav scroll on mobile
        $('#nav-bar-controller').removeClass('navbar-fixed');





        //scroll check and lock search bar
        $(window).scroll(function(){
            if( $(window).scrollTop()>53 ){
                $('#nav-part-1').addClass('hidden');
                $('#nav-bar-controller').addClass('navbar-fixed');
            }
            else{
                $('#nav-part-1').removeClass('hidden');
                $('#nav-bar-controller').removeClass('navbar-fixed');
            }

        });


      }


  });
     