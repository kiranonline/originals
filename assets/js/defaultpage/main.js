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





      //side nav bar 
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
            slide: 'a',
            autoplay: true,
            prevArrow: $('.left-side'),
            nextArrow: $('.right-side'),
            appendDots: $('.crausel-slide-controls'),
            dots: true,
            dotsClass: 'crausel-custom-dots',
            customPaging: function (slider, i) {
                var slideNumber = (i + 1),
                    totalSlides = slider.slideCount;
                return '<a class="dot" role="button" title="' + slideNumber + ' of ' + totalSlides + '"><span class="string">' + slideNumber + '/' + totalSlides + '</span></a>';
            }
        });





        if($(window).width() > 992){

            //fetch image size and set the button to the middle of carousel
            $('.carousel-image').on('load',function(){
                var slider_height = $('.carousel-image').first().height()/2;
                $('.slider-button-container').css({"top":slider_height});
            });


        }
        
        













      //media query
      if($(window).width() <= 992){
          

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
     