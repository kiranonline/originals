
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
        res.render('admindashboardpage.handlebars',{ layout: false,admindetails :req.session.admin, });
    }
});




//create new slider
router.get('/dashboard/carousel/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('adminnewcarouselpage.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
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
                        res.render('adminnewcarouselpage.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Successfull',messageBody:'File Uploaded Successfully.'});
                    });
                    
                });
            }
            else{
                res.render('adminnewcarouselpage.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'Failed',messageBody:'Slider Name already present.'});
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
            res.render('admincarouselpage.handlebars',{ layout: false,admindetails :req.session.admin,
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
            res.render('admincategorylevel2page.handlebars',{ layout: false,
                                                              admindetails :req.session.admin,
                                                              messageStatuse:false,
                                                              messageTitle:'',
                                                              messageBody:'',
                                                              tabledata:result});
            
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
        var q3="SELECT * FROM item_category_level1";
        conn.query(q3,function(err,result){
            if(err) throw err;
            res.render('admincategorylevel1page.handlebars',{ layout: false,
                                                              admindetails :req.session.admin,
                                                              messageStatuse:false,
                                                              messageTitle:'',
                                                              messageBody:'',
                                                              tabledata:result});
            
        });
    }

});


//create new category - size (level1)

router.get('/dashboard/item/category/level1/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('adminnewcategorylevel1page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});



router.post('/dashboard/item/category/level1/new',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        var name=req.body.cat_name;
        var sizes=(req.body);
        delete sizes.cat_name;
        sizes=JSON.stringify(sizes);
        var id='cat-level1-'+name.slice(0,2)+'-'+(Math.floor(Math.random()*(999999-100000+1)+100000));
        var q1='SELECT * FROM item_category_level1 WHERE id='+mysql.escape(id);
        conn.query(q1,function(err,result){
            if (err) throw err;
            if(result.length==0){
                q2='INSERT INTO item_category_level1(id,name,size,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(sizes)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                conn.query(q2,function(err,result){
                    if (err) throw err;
                    res.render('adminnewcategorylevel1page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                });
            }
            else{
                res.render('adminnewcategorylevel1page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue' });
            }

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
        res.render('adminnewcategorylevel3page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});

//view item category - event (level3)
router.get('/dashboard/item/category/level3',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db
        var q3="SELECT * FROM item_category_level3";
        conn.query(q3,function(err,result){
            if(err) throw err;
            res.render('admincategorylevel3page.handlebars',{ layout: false,
                                                              admindetails :req.session.admin,
                                                              messageStatuse:false,
                                                              messageTitle:'',
                                                              messageBody:'',
                                                              tabledata:result});
            
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
        var id='cat-level3-'+name.slice(0,2)+'-'+(Math.floor(Math.random()*(999999-100000+1)+100000));
        var q1='SELECT * FROM item_category_level3 WHERE id='+mysql.escape(id);
        conn.query(q1,function(err,result){
            if (err) throw err;
            if(result.length==0){
                q2='INSERT INTO item_category_level3(id,name,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                conn.query(q2,function(err,result){
                    if (err) throw err;
                    res.render('adminnewcategorylevel3page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                });
            }
            else{
                res.render('adminnewcategorylevel3page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue' });
            }

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
        res.render('adminnewcategorylevel4page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});

//view item category - Item Type (level4)
router.get('/dashboard/item/category/level4',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        //fetching data from db
        var q3="SELECT * FROM item_category_level4";
        conn.query(q3,function(err,result){
            if(err) throw err;
            res.render('admincategorylevel4page.handlebars',{ layout: false,
                                                              admindetails :req.session.admin,
                                                              messageStatuse:false,
                                                              messageTitle:'',
                                                              messageBody:'',
                                                              tabledata:result});
            
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
        var id='cat-level3-'+name.slice(0,2)+'-'+(Math.floor(Math.random()*(999999-100000+1)+100000));
        var q1='SELECT * FROM item_category_level4 WHERE id='+mysql.escape(id);
        conn.query(q1,function(err,result){
            if (err) throw err;
            if(result.length==0){
                q2='INSERT INTO item_category_level4(id,name,created_by,created_on) VALUES ('+mysql.escape(id)+','+mysql.escape(name)+','+mysql.escape(req.session.admin.name)+','+mysql.escape(new Date())+')';
                conn.query(q2,function(err,result){
                    if (err) throw err;
                    res.render('adminnewcategorylevel4page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'SUCCESS',messageBody:'New Category Created' });
                });
            }
            else{
                res.render('adminnewcategorylevel4page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:true,messageTitle:'FAILED',messageBody:'Technical Issue' });
            }

        });
        

    }
});








//edit color schema and theme of website
router.get('/dashboard/website/theme',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        res.render('adminnewcategorylevel4page.handlebars',{ layout: false,admindetails :req.session.admin,messageStatuse:false,messageTitle:'',messageBody:'' });
    }
});


module.exports = router;