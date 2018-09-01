$(document).ready(function(){




	$('#item-images-slide').slick({
		arrows:true,
		prevArrow:$('#left'),
		nextArrow:$('#right'),
		slidesToShow:3,
        slidesToScroll:1,
        infinite:true,
		responsive:[
            {
                breakpoint:1024,
                settings:{
                    slidesToShow:3,
                    slidesToScroll:1,
                    infinite:true
                }
            },
            {
                breakpoint:600,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true
                }
            },
            {
                breakpoint:480,
                settings:{
                    slidesToShow:2,
                    slidesToScroll:1,
                    infinite:true
                }
            }
        ]
	  });
		  
	
	
	

	
	
});