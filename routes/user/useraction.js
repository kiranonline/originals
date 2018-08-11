var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool= require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));


//wallet,profile,




//get profile page
router.get('/profile',isLoggedIn,(req,res)=>{
    var msg='',section='';
    
    if(req.query.msg){
        msg=req.query.msg;
    }
    else{
        msg=null;
    }
    if(req.query.s){
        section=req.query.s;
    }
    else{
        section=null;
    }
    
    console.log(msg);
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }

        var q1="SELECT * FROM address WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q1,(err,res1)=>{
            if(err){
                console.log(err);
            }
            var q2="SELECT * FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
            conn.query(q2,(err,res2)=>{
                if(err){
                    console.log(err);
                }
                if(res2[0].googleid!=null){
                    userType='google';
                }
                else if(res2[0].facebookid!=null){
                    userType='facebook';
                }
                else{
                    userType='local';
                }
                console.log(res2[0]);
                res.render('user/profile.handlebars',{user:res2[0],address:res1,msg:msg,section:section,userType:userType});
            });
            
        });

        conn.release();




    });
   
    
});





router.post('/profile/update',(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT * FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q1,(err,result1)=>{
            if(err){
                console.log(err);
            
            }
            
            var name=null,age=null,gender=null,phone=null,email=null;
            if(req.body.name!=undefined && req.body.name!=''){
                name=req.body.name;
            }
            if(req.body.age!=undefined && req.body.age!=''){
                age=req.body.age;
            }
            if(req.body.gender!=undefined && req.body.gender!=''){
                gender=req.body.gender;
            }
            if(req.body.phone!=undefined && req.body.phone!=''){
                phone=req.body.phone;
            }
            if(req.body.email!=undefined && req.body.email!=''){
                email=req.body.email;
            }
            console.log(name,age,gender,phone,email);
            var q2="UPDATE userlist SET name="+mysql.escape(name)+",age="+mysql.escape(age)+",gender="+mysql.escape(gender)+" WHERE user_id="+mysql.escape(req.session.passport["user"]);
            conn.query(q2,(err,result2)=>{
                if(err){
                    console.log(err);
                }
                if(result1[0].phone==null && phone !=null){
                    var q3="SELECT * FROM userlist WHERE phone="+mysql.escape(phone);
                    conn.query(q3,(err,result3)=>{
                        if(err){
                            console.log(err);
                        }
                        if(result3.length>0){
                            console.log('Duplicate phone number');
                            res.redirect('/profile/?msg=Duplicate Phone Number');
                        }
                        else{
                            var q4="UPDATE userlist SET phone="+mysql.escape(phone)+" WHERE user_id="+mysql.escape(req.session.passport["user"]);
                            conn.query(q4,(err,result4)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log('phone updated');
                                res.redirect('/profile/?msg=Details Updated');
                            });
                        }
                    });
                }
                else if(result1[0].email==null && email !=null){
                    var q5="SELECT * FROM userlist WHERE email="+mysql.escape(phone);
                    conn.query(q5,(err,result5)=>{
                        if(err){
                            console.log(err);
                        }
                        if(result5.length>0){
                            console.log('Duplicate emailid');
                            res.redirect('/profile/?msg=Duplicate Email Id');
                        }
                        else{
                            var q6="UPDATE userlist SET email="+mysql.escape(email)+" WHERE user_id="+mysql.escape(req.session.passport["user"]);
                            conn.query(q6,(err,result6)=>{
                                if(err){
                                    console.log(err);
                                }
                                console.log('email updated');
                                res.redirect('/profile/?msg=Details Updated');
                            });
                        }
                    });
                }
                else{
                    res.redirect('/profile/?msg=Details Updated');
                }
            });

            
        });
        conn.release();    
    });
});


















//get wallet page
router.get('/wallet',isLoggedIn,(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT wallet FROM userlist WHERE user_id="+mysql.escape(req.session.passport["user"]);
        conn.query(q1,(err,result1)=>{
            if(err){
                console.log(err);
            }
            res.render('user/wallet',{balance:result1[0].wallet});
        });


        conn.release();
    });
    
});















module.exports = router;