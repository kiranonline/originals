
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
const fs =  require('fs');



//main dashboard
router.get('/dashboard',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
        res.render('admindashboardpage.handlebars',{ admindetails :req.session.admin, });
    }
});




//create new slider
router.get('/dashboard/carousel/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('adminnewcarouselpage.handlebars',{ admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});

router.post('/dashboard/carousel/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        let slider_name = req.body.slider_name;
        let slider_image_name=slider_name+'.jpg';
        let slider_link = req.body.slider_link;
        let slider_image = req.files.slider_image;
        let slider_created_on = new Date();
        let slider_created_by = req.session.admin.name;

        //validating duplicate file name
        var q1='SELECT * FROM carousel_main WHERE poster_name='+mysql.escape(slider_name);
        conn.query(q1,function(err,result){
            if (err) throw err;

            if(result.length==0){
                slider_image.mv(__dirname+'/../../assets/carousel_images/'+slider_name+'.jpg',function(err){
                    if(err) throw err;
                    //inserting data in table
                    let q2='INSERT INTO carousel_main(poster_name,poster_image_name,poster_link,created_on,created_by) VALUES('+mysql.escape(slider_name)+','+mysql.escape(slider_image_name)+','+mysql.escape(slider_link)+','+mysql.escape(slider_created_on)+','+mysql.escape(slider_created_by)+')';
                    conn.query(q2,function(err,result){
                        if(err) throw err;
                        res.render('adminnewcarouselpage.handlebars',{ admindetails :req.session.admin,messageStatuse:true,messageTitle:'Successfull',messageBody:'File Uploaded Successfully.'});
                    });
                    
                });
            }
            else{
                res.render('adminnewcarouselpage.handlebars',{ admindetails :req.session.admin,messageStatuse:true,messageTitle:'Failed',messageBody:'Slider Name already present.'});
            }

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
        var q3="SELECT * FROM carousel_main";
        conn.query(q3,function(err,result){
            if(err) throw err;
            res.render('admincarouselpage.handlebars',{ admindetails :req.session.admin,
                                                        messageStatuse:msgS,
                                                        messageTitle:msgH,
                                                        messageBody:msgB,
                                                        tabledata:result});
            
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
    }
    
});


//view item category - GENDER (level2)
router.get('/dashboard/item/category/level2',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db
        var q3="SELECT * FROM item_category_level2";
        conn.query(q3,function(err,result){
            if(err) throw err;
            res.render('admincategorylevel2page.handlebars',{ admindetails :req.session.admin,
                                                              messageStatuse:false,
                                                              messageTitle:'',
                                                              messageBody:'',
                                                              tabledata:result});
            
        });
    }

});



















module.exports = router;