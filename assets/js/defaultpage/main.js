$( document ).ready(function() {
    var slideIndex = 0;
    showSlides();
    function showSlides() {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
           slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}    
        slides[slideIndex-1].style.display = "block";  
        setTimeout(showSlides, 4000); // Change image every 2 seconds
    }

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
                var slider_height = $('.carousel-image').first().height()/2 + $('.mySlides').first().height();
                $('.slider-button-container').css({"top":slider_height});
            });


        }
        
        

  });
     