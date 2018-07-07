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





      //side nav bar on phone
      function toggleClassMenu() {
            myMenu.classList.add("menu--animatable");	
                if(!myMenu.classList.contains("menu--visible")) {		
                    myMenu.classList.add("menu--visible");
                } else {
                    myMenu.classList.remove('menu--visible');		
                }	
        }
    
        function OnTransitionEnd() {
            myMenu.classList.remove("menu--animatable");
        }
        
        var myMenu = document.querySelector(".menu");
        var oppMenu = document.querySelector(".menu-icon");
        myMenu.addEventListener("transitionend", OnTransitionEnd, false);
        oppMenu.addEventListener("click", toggleClassMenu, false);
        myMenu.addEventListener("click", toggleClassMenu, false);

        

        //carousel
        $('.home-page-carousel').slick({
            infinite:true,
            autoplay:true,
            autoplaySpeed: 3000,
            cssEase: 'linear',
        });













      //media query
      if($(window).width() <= 992){
          
        //enable search bar inmobile view 
        $('#mobile-search').removeClass('hidden');

        //enable nav scroll on mobile
        $('#nav-bar-controller').removeClass('navbar-fixed');

        //enable menu icon
        $('.menu-icon').removeClass('hidden');
        
        
        //disable website icon in phone
        $('.main-logo').addClass('hidden'); 

        





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
     