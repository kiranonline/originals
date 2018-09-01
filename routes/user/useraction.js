var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var pool= require(path.join(__dirname, '/../../dependencies/connection.js'));
const fs = require('fs');
var uniqid = require('uniqid');
var isLoggedIn = require(path.join(__dirname, '/../../dependencies/checkloggedin.js'));
var sendEmail = require(path.join(__dirname,'/../../dependencies/email.js'));
var md5 = require('md5');

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
                var q3="(SELECT order_id,items,net_amount_with_delivery_charge,order_status,tracking_id,date FROM order_table WHERE user_id="+mysql.escape(req.session.passport["user"])+" ORDER BY date) UNION ALL (SELECT order_id,items,net_amount_with_delivery_charge,order_status,tracking_id,date FROM temp_order WHERE user_id="+mysql.escape(req.session.passport["user"])+" AND ( ( order_status='conflict' AND payment_status='conflict' ) OR ( order_status='not placed' AND payment_status='failed' )) ORDER BY date)";
                conn.query(q3,(err,result3)=>{
                    if(err){
                        console.log(err);
                    }
                    
                    res.render('user/profile.handlebars',{user:res2[0],address:res1,msg:msg,section:section,userType:userType,orders:result3});
                }); 
            });
            
        });

        conn.release();




    });
   
    
});





router.post('/profile/update',isLoggedIn,(req,res)=>{
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
	    var q2="SELECT * FROM wallet_transaction WHERE user_id="+mysql.escape(req.session.passport["user"])+" ORDER BY timestamp DESC";
	    conn.query(q2,(err,result2)=>{
	    	if(err){
			console.log(err);		
		}
		console.log(result2);		
		res.render('user/wallet',{balance:result1[0].wallet,transaction_list:result2});
            });
        });


        conn.release();
    });
    
});






router.get('/forgetpassword',(req,res)=>{
   res.render('user/putemail',{error:null});
});


router.post('/forgetpassword',(req,res)=>{
    var email=req.body.email;
    
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT * FROM userlist WHERE email="+mysql.escape(email)+" AND password IS NOT NULL";
        conn.query(q1,(err,result1)=>{
            if(err){
                console.log(err);
            }
    
            if(result1.length==1){
                var user_id=result1[0].user_id;
                var otp=uniqid('reset-');
                let link="http://"+req.get('host')+"/resetpassword?id="+otp;
                var q2="SELECT * FROM reset_password WHERE user_id="+mysql.escape(user_id);
                conn.query(q2,(err,result2)=>{
                    if(err){
                        consiole.log(err);
                    }
                    if(result2.length==0){
                        var q3="INSERT INTO reset_password(user_id,email,otp,created_on) VALUES ("+mysql.escape(user_id)+","+mysql.escape(email)+","+mysql.escape(otp)+","+mysql.escape(new Date())+")";
                        conn.query(q3,(err,resul3)=>{
                            if(err){
                                console.log(err);
                            }
                            var email_body="Click on the following link to reset your password <br> "+link;
                            sendEmail(email,"Originsla - Reset Password",email_body);
                            res.send('email sent');
                            console.log('i am if');
                        });
                        
                        
                    }
                    else{
                        console.log('i am here');
                        var q4="DELETE FROM reset_password WHERE user_id="+mysql.escape(user_id);
                        conn.query(q4,(err,result4)=>{
                            if(err){
                                console.log(er);
                                var q3="INSERT INTO reset_password(user_id,email,otp,created_on) VALUES ("+mysql.escape(user_id)+","+mysql.escape(email)+","+mysql.escape(otp)+","+mysql.escape(new Date())+")";
                                conn.query(q3,(err,resul3)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    var email_body="Click on the following link to reset your password<br> "+link;
                                    sendEmail(email,"Originsla - Reset Password",email_body);
                                    console.log('i am else');
                                    res.send('email sent');
                                });
                            }
                        });
                        
                    }
                });
            }
            else{
                res.render('user/putemail',{error:"You can't change the password of this account"});
            }
        });
        conn.release(); 
    });
});




router.get('/resetpassword',(req,res)=>{
    var otp=req.query.id;
    if(otp!=null){
        res.render('user/forgetpassword',{otp:otp})
    }
    else{
        res.send('Link Expired or Invalid');
    }
});




router.post('/resetpassword',(req,res)=>{
    var otp=req.body.otp;
    var password=md5(req.body.password1);
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT * FROM reset_password WHERE otp="+mysql.escape(otp);
        conn.query(q1,(err,result1)=>{
            if(err){
                console.log(err);
            }
            if(result1.length==1){
                var user_id=result1[0].user_id;
                var q2="UPDATE userlist SET password="+mysql.escape(password)+" WHERE user_id="+mysql.escape(user_id);
                conn.query(q2,(err,result2)=>{
                    if(err){
                        console.log(err);
                    }
                    var q3="DELETE FROM reset_password WHERE otp="+mysql.escape(otp);
                    conn.query(q3,(err,result5)=>{
                        if(err){
                            console.log(err);
                        }
                        res.redirect('/login?msg=Password Changed');
                    });
                    
                });
            }
            else{
                res.send('Link Expired or Invalid');
            }
        });
        conn.release();
    });
});











router.get('/terms-and-condition',(req,res)=>{
    res.render('others/terms');
});

router.get('/privacy-policy',(req,res)=>{
    res.render('others/privacy');
});

router.get('/refund-policy',(req,res)=>{
    res.render('others/refund');
});

router.get('/wallet-policy',(req,res)=>{
    res.render('others/wallet_policy');
});









module.exports = router;
