
var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));



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




//create new carousel
router.get('/dashboard/carousel/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
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



//view all carousels
router.get('/dashboard/carousel',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
        res.render('admincarouselpage.handlebars',{ admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});

















module.exports = router;