"use strict";
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname,'/../../dependencies/connection.js'));
var cashback = require(path.join(__dirname,'/../../dependencies/cashback.js'));
const fs =  require('fs');
const fse = require('fs-extra');
var uniqid = require('uniqid');
var trim = require('trim');
var request= require('request');
const fileUpload = require('express-fileupload');




//main dashboard
router.get('/dashboard',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('Welcome Admin....');
        console.log(req.session.admin);
        res.render('admin/admindashboardpage',{ layout: false,admindetails :req.session.admin});
    }
});




//create new slider
router.get('/dashboard/carousel/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/adminnewcarouselpage',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:''});
    }
});





router.post('/dashboard/carousel/new',(req,res)=>{
    console.log(req.body);
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log(req.body);
        let slider_name = req.body.slider_name;
        let slider_image_name='/carousel_images/'+slider_name+'.jpg';
        let slider_link = req.body.slider_link;
        let slider_image = req.files.slider_image;
        let slider_created_on = new Date();
        let slider_created_by = req.session.admin.name;

        //validating duplicate file name

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1='SELECT * FROM carousel_main WHERE poster_name='+mysql.escape(slider_name);
            conn.query(q1,function(err,result){
                if (err) {
                    console.log(err);    
                }
                
    
                if(result.length==0){
                    slider_image.mv(path.join(__dirname,'/../../assets/carousel_images/'+slider_name+'.jpg'),function(err){
                        if(err){
                            console.log(err);  
                        } 
                        //inserting data in table
                        let q2='INSERT INTO carousel_main(poster_name,poster_image_link,poster_link,created_on,created_by) VALUES('+mysql.escape(slider_name)+','+mysql.escape(slider_image_name)+','+mysql.escape(slider_link)+','+mysql.escape(slider_created_on)+','+mysql.escape(slider_created_by)+')';
                        conn.query(q2,function(err,result){
                            if(err){
                                console.log(err);
                            }
                            res.render('admin/adminnewcarouselpage',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Successfull',messageBody:'File Uploaded Successfully.'});
                        });
                        
                    });
                }
                else{
                    res.render('admin/adminnewcarouselpage',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Failed',messageBody:'Slider Name already present.'});
                }
    
            });
        conn.release();    

        });
        
        
        
    }
});








//view all sliders
router.get('/dashboard/carousel',function(req,res){
    //validating loggedin
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        if(req.query.msg){
            var msgS=true;
            var msgH=req.query.msg;
            var msgB='Slider Deleted Sucessfully';
        }
        else{
            var msgS=false;
            var msgH='';
            var msgB=''
        }
        //fetching data from db

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var q3="SELECT * FROM carousel_main";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincarouselpage',{ layout: false,admindetails :req.session.admin,
                                                            messageStatuse:msgS,
                                                            messageTitle:msgH,
                                                            messageBody:msgB,
                                                            tabledata:result});
                
            });
            conn.release();

        });
        
        
    }
});








//delete a slider
router.get('/dashboard/carousel/del',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var slider_name=req.query.name;

        //validating right name
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var q1='SELECT * FROM carousel_main WHERE poster_name='+mysql.escape(slider_name);
            conn.query(q1,function(err,result){
                if (err) throw err;
    
                if(result.length==1){
                    var q2='DELETE FROM carousel_main WHERE poster_name='+mysql.escape(slider_name);
                    conn.query(q2,function(err,result){
                        if(err) throw err;
                        fs.unlink(__dirname+'/../../assets/carousel_images/'+slider_name+'.jpg',function(){
                            res.redirect('/admin/dashboard/carousel/?msg=Deleted');
                        });
                        
    
                    });
                }
                else{
                    res.redirect('/admin/dashboard/carousel');
                }
    
            });
            conn.release();



        });
        
    }
    
});











//view item category - GENDER (level2)
router.get('/dashboard/item/category/level2',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var q3="SELECT * FROM item_category_level2";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincategorylevel2page',{ layout: false,
                                                                  admindetails :req.session.admin,
                                                                  messageStatuse:false,
                                                                  messageTitle:'',
                                                                  messageBody:'',
                                                                  tabledata:result});
                
            });
            conn.release();

        });
        
    }

});




























//view item category - color
router.get('/dashboard/item/category/color',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q3="SELECT * FROM color";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincolor',{ layout: false,
                                                                  admindetails :req.session.admin,
                                                                  messageStatuse:false,
                                                                  messageTitle:'',
                                                                  messageBody:'',
                                                                  tabledata:result});
                
            });
            conn.release();

        });
        
    }

});


//create new category - size (level1)

router.get('/dashboard/item/category/color/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1="SELECT * FROM item_category_level4";
            conn.query(q1,function(err,result){
                if(err){
                    console.log(err);
                }
                var for_item = result; 
                res.render('admin/adminnewcolor',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'',for:for_item});
            });
            conn.release();

        });
        
        
    }
});









router.post('/dashboard/item/category/color/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log(req.body);
        var name=req.body.cat_name;
        var this_is_for=req.body.cat_for;
        var colors=(req.body);
        delete colors.cat_name;
        delete colors.cat_for;
        colors=JSON.stringify(colors);

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }


            var q2='SELECT * FROM item_category_level4 WHERE name='+mysql.escape(this_is_for);
            console.log(req.body);
            conn.query(q2,function(err,result){
                if(err) {
                    console.log(err);
                }
                if(result.length==1){
                    var for_item_id=result[0].id;
                    var id=uniqid('cat-color-');
                    var q1='SELECT * FROM color WHERE id='+mysql.escape(id);
                    conn.query(q1,function(err,result){
                        if (err) {
                            console.log(err);
                        }
                        if(result.length==0){
                            q2='INSERT INTO color(id,name,color,for_item,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(colors)+','+mysql.escape(for_item_id)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                            conn.query(q2,function(err,result){
                                if (err){
                                    console.log(err);
                                }
                                res.render('admin/adminnewcolor',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                            });
                        }
                        else{
                            res.render('admin/adminnewcolor',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue'});
                        }
    
                    });
                }
                
            });

            conn.release();

        });
        
        
        

    }
});











































//view item category - size (level1)
router.get('/dashboard/item/category/level1',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var q3="SELECT * FROM item_category_level1";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincategorylevel1page',{ layout: false,
                                                                  admindetails :req.session.admin,
                                                                  messageStatuse:false,
                                                                  messageTitle:'',
                                                                  messageBody:'',
                                                                  tabledata:result});
                
            });

            conn.release();


        });
        
    }

});









//create new category - size (level1)

router.get('/dashboard/item/category/level1/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1="SELECT * FROM item_category_level4";
            conn.query(q1,function(err,result){
                if(err){
                    console.log(err);
                }
                var for_item = result; 
                res.render('admin/adminnewcategorylevel1page',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'',for:for_item});
            });

        });
        
        
    }
});









router.post('/dashboard/item/category/level1/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var name=req.body.cat_name;
        var this_is_for=req.body.cat_for;
        var sizes=(req.body);
        delete sizes.cat_name;
        delete sizes.cat_for;
        sizes=JSON.stringify(sizes);

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q2='SELECT * FROM item_category_level4 WHERE name='+mysql.escape(this_is_for);
            conn.query(q2,function(err,result){
                if(err) {
                    console.log(err);
                }
                if(result.length==1){
                    var for_item_id=result[0].id;
                    var id=uniqid('cat-level1-');
                    var q1='SELECT * FROM item_category_level1 WHERE id='+mysql.escape(id);
                    conn.query(q1,function(err,result){
                        if (err) {
                            console.log(err);
                        }
                        if(result.length==0){
                            q2='INSERT INTO item_category_level1(id,name,size,for_item,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(sizes)+','+mysql.escape(for_item_id)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                            conn.query(q2,function(err,result){
                                if (err){
                                    console.log(err);
                                }
                                res.render('admin/adminnewcategorylevel1page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                            });
                        }
                        else{
                            res.render('admin/adminnewcategorylevel1page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue'});
                        }
    
                    });
                }
                
            });

            conn.release();


        });
        
        
        

    }
});











//create new category - events (level3)
//create new slider
router.get('/dashboard/item/category/level3/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/adminnewcategorylevel3page',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});





//view item category - event (level3)
router.get('/dashboard/item/category/level3',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q3="SELECT * FROM item_category_level3";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincategorylevel3page',{ layout: false,
                                                                  admindetails :req.session.admin,
                                                                  messageStatuse:false,
                                                                  messageTitle:'',
                                                                  messageBody:'',
                                                                  tabledata:result});
                
            });
            conn.release();

        });
        
    }

});

//create new event category
router.post('/dashboard/item/category/level3/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var name=req.body.cat_name;
        var id=uniqid('cat-level3-');
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var q1='SELECT * FROM item_category_level3 WHERE id='+mysql.escape(id);
            conn.query(q1,function(err,result){
                if (err) {
                    console.log(err);
                }
                if(result.length==0){
                    var q2='INSERT INTO item_category_level3(id,name,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                    conn.query(q2,function(err,result){
                        if (err) {
                            console.log(err);
                        }
                        res.render('admin/adminnewcategorylevel3page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                    });
                }
                else{
                    res.render('admin/adminnewcategorylevel3page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue' });
                }
    
            });


            conn.release();
        });
        
        

    }
});












//create new category - Item Type (level4)
//create new slider
router.get('/dashboard/item/category/level4/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/adminnewcategorylevel4page',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:''});
    }
});









//view item category - Item Type (level4)
router.get('/dashboard/item/category/level4',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q3="SELECT * FROM item_category_level4";
            conn.query(q3,function(err,result){
                if(err){
                    console.log(err);
                }
                res.render('admin/admincategorylevel4page',{ layout: false,
                                                                  admindetails :req.session.admin,
                                                                  messageStatuse:false,
                                                                  messageTitle:'',
                                                                  messageBody:'',
                                                                  tabledata:result});
                
            });

            conn.release();



        });
        
    }

});








//create new event category
router.post('/dashboard/item/category/level4/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var name=req.body.cat_name;
        var id=uniqid('cat-level4-');
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1='SELECT * FROM item_category_level4 WHERE id='+mysql.escape(id)+' OR name='+mysql.escape(name);
            conn.query(q1,function(err,result){
                if (err) {
                    console.log(err);
                }
                if(result.length==0){
                    console.log(result);
                    fs.mkdir('assets/uploads/'+name,function(err){
                        if(err) {
                            console.log(err);
                        }
                        else{
                            var q2='INSERT INTO item_category_level4(id,name,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                            conn.query(q2,function(err,result){
                                if (err){
                                    console.log(err);
                                }
                                res.render('admin/adminnewcategorylevel4page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                            });
                        }
                    });
                    
                }
                else{
                    res.render('admin/adminnewcategorylevel4page',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue' });
                }
    
            });
            conn.release();


        });
        
        

    }
});













//edit color schema and theme of website
router.get('/dashboard/website/theme',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        fs.readFile(path.join(__dirname,'/../../dependencies/website.theme'), function(err, text) {
            if (err) throw err;
            var data = JSON.parse(text.toString());
            res.render('admin/adminwebsitetheme',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'',data:data ,csrf:req.csrfToken()});
          });
        
    }
});





router.post('/dashboard/website/theme',function(req,res){
    console.log(req.body);
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{  
        let primary_colour_1 = req.body.primary_colour_1;
        let primary_colour_2 = req.body.primary_colour_2;
        let secondary_colour_1 = req.body.secondary_colour_1;
        let secondary_colour_2 = req.body.secondary_colour_2;
        let image_name='main.jpg';
        let image = req.files.image;

        let created_on = new Date();
        let created_by = req.session.admin.name;

        var theme = {
            primary_colour_1    : primary_colour_1,
            primary_colour_2    : primary_colour_2,
            secondary_colour_1  : secondary_colour_1,
            secondary_colour_2  : secondary_colour_2,
            updated_by          : created_by,
            updated_on          : created_on,
            image_link          : '/theme_images/main.jpg'
        }

        fs.writeFile(path.join(__dirname,'/../../dependencies/website.theme'),JSON.stringify(theme),function(err,data){
            if (err){
                console.log(err);
            }
            image.mv(__dirname+'/../../assets/theme_images/'+image_name,function(err){ 
                if (err){
                    console.log(err);
                }
                //res.render('adminwebsitetheme.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Theme Updated',messageBody:'Theme updated successfully !',data:data });
                res.redirect('/admin/dashboard/website/theme/?msg=updated');
            });
        });



        
        
        
    }
});










//get the listed item page
//show items
router.get('/dashboard/item',function(req,res){

    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{  

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var query="SELECT * FROM items";
            conn.query(query,function(err,result){
                console.log(result);
                res.render('admin/adminitems',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'',items:result,});
            });

            conn.release();

        });
        

    }
	
	
	
	
});











//get the add new item page
router.get('/dashboard/item/new',function(req,res){

    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{ 

        //res.render('adminItemUpload.handlebars');


        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var query1="SELECT id,name FROM item_category_level4;";
	
            var  query2="SELECT id,name FROM item_category_level3;";
            console.log("add item page");
            conn.query(query1, function (err4, result4) {
                    if (err4) {
                        console.log(err);
                    }
                        conn.query(query2, function (err3, result3) {
                            if (err3){
                                console.log(err);
                            }
                            res.render('admin/adminnewitempage',{layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'',category4:result4,category3:result3});
                    
                        });
                    
            });

            conn.release();


        });
	    

    }
	


	
});










//get the sizes
//get item sizes
router.post('/dashboard/category1',function(req,res){
    console.log(req.body.category4);

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }

        var query ="SELECT id,name,size FROM item_category_level1 WHERE for_item="+mysql.escape(req.body.category4.split(",")[0]);
        console.log(query);
        conn.query(query,function(err,result)
        {
            if(err){
                console.log(err);
            }
                var sizes=result;
                var query1 ="SELECT id,name,color FROM color WHERE for_item="+mysql.escape(req.body.category4.split(",")[0]);
                conn.query(query1,function(err,res1){
                    if(err){
                        console.log(err);
                    }
                    var ress={
                        sizes:JSON.parse(JSON.stringify(sizes)),
                        colors:JSON.parse(JSON.stringify(res1))
                    }
                    console.log(ress);
                    res.send(ress);
    
                });
            
            
        });

        conn.release();

    });
	
});








//save new item
router.post('/dashboard/item/new',function(req,res){
    console.log(req.body);
    if(!req.session.admin){
       res.redirect('/admin/login');
   }
   else{
       var name=req.body.name;
       var price=req.body.price;
       var cashback=req.body.cashback;
       var delivery_charge=req.body.delevery_charge;
       var id=uniqid('item-'); 	
       var size_id=req.body.size.split(",")[0] || "none";
       var size_name=req.body.size.split(",")[1] || "none";
       var color_id=req.body.color.split(",")[0] || "none";
       var color_name=req.body.color.split(",")[1] || "none";
       var gender=req.body.gender;
       var event_type_id=req.body.event_type.split(",")[0] || "none";
       var event_type_name=req.body.event_type.split(",")[1] || "none";
       var item_type_id=req.body.item_type.split(",")[0];
       var item_type_name=req.body.item_type.split(",")[1];
       var added_by=req.session.admin.name;
       var added_on=new Date();
       var tags=req.body.tags;
       var desc = req.body.desc;
        console.log(color_id,event_type_id,size_id);    
       console.log('i am okk1');
    
       var str=tags.replace(/  +/g,' ');
       console.log(str);
      
           console.log('i am okk3');
           pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }


            var check_query="SELECT * FROM items WHERE id="+mysql.escape(id);
            conn.query(check_query,function(err,result_checked){
                 if(err){
                     console.log(err);
                 }   
              else{
                     if(result_checked.length==0){
                         fs.mkdir('assets/uploads/'+item_type_name+"/"+id,function(err){
                             if (err) {
                                 //console.log("cant create directory");
                                return console.error(err);
                             }
                             var item_image_list ={};
                             console.log("Directory created successfully!");
                             for(var i=0;i<req.files.file.length;i++)
                             {
                                 console.log(req.files.file[i].name);
                                 var file=req.files.file[i];
                                 file.mv('././assets/uploads/'+item_type_name+"/"+id+"/"+req.files.file[i].name,function(err){
                                     if(err) {
                                         console.log('Error');
                                     }
                                     
                                     console.log("file moved ");                                 
                                 });
                                 item_image_list[i+1]='uploads/'+item_type_name+"/"+id+"/"+req.files.file[i].name;
                                 if(i==(req.files.file.length-1)){
                                     do_it();
                                 }
                             }
                             
                              function do_it(){
                                 var query ="INSERT INTO items (id,name,price,cashback,delivery_charge,size_id,size_name,color_id,color_name,gender,event_id,event_name,type_id,type_name,tags,images,added_by,added_on) VALUES ("+mysql.escape(id)+","+mysql.escape(name)+","+mysql.escape(price)+","+mysql.escape(cashback)+","+mysql.escape(delivery_charge)+","+mysql.escape(size_id)+","+mysql.escape(size_name)+","+mysql.escape(color_id)+","+mysql.escape(color_name)+","+mysql.escape(gender)+","+mysql.escape(event_type_id)+","+mysql.escape(event_type_name)+","+mysql.escape(item_type_id)+","+mysql.escape(item_type_name)+","+mysql.escape(str)+","+mysql.escape(JSON.stringify(item_image_list))+","+mysql.escape(added_by)+","+mysql.escape(added_on)+")";
                                 console.log(query); 
                                 conn.query(query,function(err,result){
                                     if(err) throw err;
                                     console.log("Item added to the database");
                                     var query1="SELECT name FROM item_category_level4;";
                                 
                                     var  query2="SELECT name FROM item_category_level3;";
                                     console.log("add item page");
                                     conn.query(query1, function (err4, result4) {
                                                 if (err4) throw err4;
                                                 conn.query(query2, function (err3, result3) {
                                                 if (err3) throw err3;
                                                 console.log("exiting");
                                                 res.render('admin/adminnewitempage.handlebars',{layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Success',messageBody:'Item Created',category4:result4,category3:result3 });
                                                 
                                         });
                                                 
                                     });
                                 });
                              }
                             
                          });
                     }
                     else{
                         var query1="SELECT name FROM item_category_level4;";
                                      
                         var  query2="SELECT name FROM item_category_level3;";
                         console.log("add item page");
                         conn.query(query1, function (err4, result4) {
                                     if (err4) throw err4;
                                     conn.query(query2, function (err3, result3) {
                                        if (err3) throw err3;
                                         res.render('admin/adminnewitempage.handlebars',{layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Error',messageBody:'Technical issue',category4:result4,category3:result3});
                                     
                             });
                                     
                         });
                     }
                 }
            });

            conn.release();


        });
   
       
       
       
      
    
       
       
   
   
    }
   
});






//delete item
router.delete('/dashboard/item/delete/:id',(req,res)=>{
    var id = req.params.id;

    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1 = "SELECT * FROM items WHERE id="+mysql.escape(id);
        conn.query(q1,(err,result)=>{
            if(err){
                console.log(err);
            }
           
            if(result.length==1){
                if(result[0].status=='active'){
                    var q2="UPDATE items SET status='inactive' WHERE id="+mysql.escape(id);
                    conn.query(q2,(err,result2)=>{
                        if(err){
                            console.log(err);
                        }
                        res.send('Success');
                    });
                }
                else{

                    var q2="UPDATE items SET status='active' WHERE id="+mysql.escape(id);
                    conn.query(q2,(err,result2)=>{
                        if(err){
                            console.log(err);
                        }
                        res.send('Success');
                    });
                }
                
                
            }
            else{
                res.status(404).send('Technical Issue');
            }
            
        });
        conn.release();


    });
    
});



















//view promocode
router.get('/dashboard/promocode/', (req,res)=>{
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        if(req.query.msg){
            var msgS=true;
            var msgH=req.query.msg;
            var msgB='Slider Deleted Sucessfully';
        }
        else{
            var msgS=false;
            var msgH='';
            var msgB=''
        }

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q2="SELECT * FROM promocode";
            conn.query(q2,(err,result)=>{
                if(err){
                    console.log(err);
                }
                res.render('admin/promocode',{layout: false,admindetails :req.session.admin,messageStatuse:msgS,messageTitle:msgH,messageBody:msgB,codes:result});
            });
            conn.release();

        });
        
        
    }
});









//new promoce form
router.get('/dashboard/promocode/new',(req,res)=>{
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('admin/new_promocode',{layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:''});
    }
});


//create promocode form
router.post('/dashboard/promocode/new',(req,res)=>{
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var id = uniqid('promo-'); 
        var promo_type = req.body.promo_type;
        var percentage =  req.body.percentage;
        var promocode = req.body.promocode;
        var upto = req.body.value_upto;
        var added_by=req.session.admin.name;
        var added_on=new Date();


        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q2="SELECT * FROM promocode WHERE id="+mysql.escape(id)+"OR promocode="+mysql.escape(promocode);
            conn.query(q2,(err,result1)=>{
                if(err){
                    console.log(err);
                    
                }
                if(result1.length==0){
                    var q1="INSERT INTO promocode(id,type,promocode,percentage,upto,created_by,created_on) VALUES ("+mysql.escape(id)+","+mysql.escape(promo_type)+","+mysql.escape(promocode)+","+mysql.escape(percentage)+","+mysql.escape(upto)+","+mysql.escape(added_by)+","+mysql.escape(added_on)+")";
                    conn.query(q1,(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                        res.render('admin/new_promocode',{layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Success',messageBody:'Promocode added successfully'});            
                    });
                }
                else{
                    res.render('admin/new_promocode',{layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Error',messageBody:'Duplicate Promocode'});            
                }
            });
        
            conn.release();


        });
        
    }
});













//delete 
router.get('/dashboard/promocode/delete', (req,res)=>{
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{

        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }


            var q2="SELECT * FROM promocode WHERE id="+mysql.escape(req.query.id);
            conn.query(q2,(err,result)=>{
                if(err){
                    console.log(err);
                }
                console.log(result);
                if(result.length==1){
                    var q3="DELETE FROM promocode WHERE id="+mysql.escape(req.query.id);
                    conn.query(q3,(err,result1)=>{
                        if(err){
                            console.log(err);
                            res.redirect('/admin/dashboard/promocode');
                        }
                        else{
                            res.redirect('/admin/dashboard/promocode');
    
                        }
                        
                    });
                } 
                else{
                    res.redirect('/admin/dashboard/promocode/?msg=Deleted');
                }           
            });

            conn.release();


        });
        
    }
});














router.get('/dashboard/orders',(req,res)=>{
    console.log('i am called');

    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var query_type=null;

        if(req.query.type){
            query_type=req.query.type;
        }
        else{
            query_type=null;
        }
        console.log('jjjjjjjjjjj');
        console.log(query_type);


        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            if(query_type=='today_placed'){
                var date=new Date();
                var m=String(date.getMonth());
                if(m.length<2){
                    m=parseInt(m);
                    m=m+1;
                    m=String(m);
                    m='0'+m;
                }
                var d=String(date.getDate());
                if(d.length<2){
                    
                    d='0'+d;
                }
                var y=date.getFullYear();
                
                var q1="SELECT * FROM order_table WHERE date LIKE "+mysql.escape(y+"-"+m+"-"+d+"%");
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});
                });
            }
            else if(query_type=='not_delivered'){
                var q1="SELECT * FROM order_table WHERE NOT order_status='delivered'";
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});

                });
            }
            else if(query_type=='delivered'){
                var q1="SELECT * FROM order_table WHERE order_status='delivered'";
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});

                });
            }
            else if(query_type=='shipped'){
                var q1="SELECT * FROM order_table WHERE order_status='shipped'";
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});

                });
            }
            else if(query_type=='packed'){
                var q1="SELECT * FROM order_table WHERE order_status='packed'";
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});

                });
            }
            else if(query_type=='placed'){
                var q1="SELECT * FROM order_table WHERE order_status='placed'";
                console.log(q1);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    console.log(result1);
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});

                });
            }
            else{
                //no parameter or invaid paramiter
                var q1="SELECT * FROM order_table";
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                   // res.send(result1);
                   res.render('admin/adminorder',{layout:false,orders:result1});
                });
            }
            conn.release();
        });

    }

});







router.get('/dashboard/temporders',(req,res)=>{

    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1="SELECT * FROM temp_order";
            conn.query(q1,(err,result1)=>{
                if(err){
                    console.log(err);
                }
                //res.send("hello");
                res.render('admin/admin_temporder',{layout:false,orders:result1});
            });
            conn.release();
        });

    }

});






router.get('/dashboard/order/:id',(req,res)=>{
    console.log(req.params.id);
    var order_id=req.params.id;
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            var q1="SELECT * FROM order_table WHERE order_id="+mysql.escape(order_id);
            conn.query(q1,(err,result1)=>{
                if(err){
                    console.log(err)
                }
                var q2="SELECT * FROM userlist WHERE user_id="+mysql.escape(result1[0].user_id);
                conn.query(q2,(err,result2)=>{
                    if(err){
                        console.log(err);
                    }
                    var items=JSON.parse(result1[0].items);
                    console.log(items);
                    var status=[];
                    if(result1[0].order_status=="packed"){
                        status=["packed","shipped","delivered"];
                    }
                    else if(result1[0].order_status=="shipped"){
                        console.log('i am inn');
                        status=["shipped","delivered"];
                    }
                    else if(result1[0].order_status=="delivered"){
                        status=["delivered"];
                    }
                    else{
                        status=["placed","packed","shipped","delivered"];
                    }


                    res.render('admin/order',{layout:false,order:result1[0],user:result2[0],items:items.items,status:status});
                });
                
            });
            conn.release();
        });
    }
});









router.post('/dashboard/order/:id',(req,res)=>{
    var order_id=req.params.id;
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }

            var status=req.body.status;
            var tracking_id=null;
            if(req.body.tracking_id){
                tracking_id=req.body.tracking_id;
            }
            if(status=="shipped"){
                var q1="UPDATE order_table SET tracking_id="+mysql.escape(tracking_id)+",order_status="+mysql.escape(status)+" WHERE order_id="+mysql.escape(order_id);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/admin/dashboard/order/'+order_id);
                });
            }
            else if(status=="packed"){
                var q1="UPDATE order_table SET order_status="+mysql.escape(status)+" WHERE order_id="+mysql.escape(order_id);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/admin/dashboard/order/'+order_id);
                });
            }
            else if(status=="delivered"){
                var q1="UPDATE order_table SET order_status="+mysql.escape(status)+" WHERE order_id="+mysql.escape(order_id);
                conn.query(q1,(err,result1)=>{
                    if(err){
                        console.log(err);
                    }

                    cashback(order_id,function(s){
                        if(s=='s'){
                            res.redirect('/admin/dashboard/order/'+order_id);
                        }
                        else{
                            res.send('Unable to give cashback, check order_id='+order_id);
                        }
                    });              
                    
                });
            }
            else{
                res.redirect('/admin/dashboard/order/'+order_id);
            }
            
            conn.release();
        });
    }
});











module.exports = router;
