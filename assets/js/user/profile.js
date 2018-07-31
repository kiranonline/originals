$(document).ready(function(){

    //gender select
    $('select').formSelect();



    //enable-edit
    $('#activate-edit').on('click',function(){
        $('.editable').removeAttr("disabled");
        $('.submit-button').removeClass('hide');
        $('#gender').formSelect();
    });


    //password chnaging modal
    $('.modal').modal();




    var pages = ["#personaldetails","#addresssection","#referalsection","#myordersection"]
    var page_controllers =[".openpersonaldetails",".openaddresssection",".openreferalsection",".openmyordersection"];
    //initiating page changing function
    function alterpage(activebutton,activepage){
        var array_len = pages.length;
       for(var i=0;i<array_len;i++){
           $(pages[i]).css('display','none');
           $(page_controllers[i]).removeClass('active-menu');
       }
       $(activepage).css('display','block');
       $(activebutton).addClass('active-menu');
    }
    

    $(".openpersonaldetails").on("click",function(){
        alterpage(".openpersonaldetails",'#personaldetails');
    });
    $(".openaddresssection").on("click",function(){
        alterpage(".openaddresssection","#addresssection");
    });
    $(".openreferalsection").on("click",function(){
        alterpage(".openreferalsection","#referalsection");
    });
    $(".openmyordersection").on("click",function(){
        alterpage(".openmyordersection","#myordersection");
    });



    //initial setup
    alterpage(".openpersonaldetails","#personaldetails");


 
 
	//enable-edit for address
	
	
	
	
	
	
	$('.modal').modal({height:200});
	
	//$('select').formSelect();
	
	







});