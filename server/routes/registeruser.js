var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('206237AVC3B7xM5aba8ca1');
var conn = require(path.join(__dirname,'/../connection.js'));
var time = require('time');
var md5 = require('md5');
var nodemailer = require('nodemailer');




//checking for connection




//routers

/*-----------------------------------------API STRUCTURE-----------------------------------------------
post{
    "phone":"",
    "email":"",
    "password":"",
    "name":"",
    "gender":"",
    "dob":""
}
*/
router.post('/',(req,res,next)=>{
    var email = mysql.escape(req.body.email);
    var phone = mysql.escape(req.body.phone);
    var otp=0;


    //check duplicate email
    conn.query("SELECT * FROM users WHERE user_email ="+email,function(err,response1){
        if (err) throw err;
        else{
            console.log(response1);
            //check duplicate phone number
            conn.query("SELECT * FROM users WHERE user_phone_number ="+phone,function(err,response2){
                if (err) throw err;
                else{
  
                    //check for duplicate entry
                    if(response1.length==0 && response2.length==0){
                        otp= Math.floor(1000 + Math.random() * 9000);
                        //send varification otp
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'kirankumardas224@gmail.com', // Your email id
                                pass: 'mylove224harshita' // Your password
                            }
                        });
                        var mailtext = 'We have received your request for your new account. The varification OTP is \n'+otp;
                        var mailOptions = {
                            from: 'kirankumardas224@gmail.com', // sender address
                            to: email, // list of receivers
                            subject: 'The Originals, Account Verification', // Subject line
                            text: mailtext //, // plaintext body
                            // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            console.log('Trying');
                            if(error){
                                console.log(error);
                            }else{
                                console.log('Message sent: ' + info.response);
                            };
                        });
                        console.log(otp);
                        //insert data into temporary user
                        var now = new time.Date();
                        now.setTimezone("Asia/Kolkata");
                        const dummyuser={
                            user_email:mysql.escape(req.body.email),
                            user_phone_number:mysql.escape(req.body.phone),
                            user_password:mysql.escape(md5(req.body.password)),
                            user_name:mysql.escape(req.body.name),
                            user_gender:mysql.escape(req.body.gender),
                            user_DOB:mysql.escape(req.body.dob),
                            otp:otp,
                            req_time:mysql.escape(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds())
                        };
                        conn.query("INSERT INTO temp_user(user_email,user_phone_number,user_password,user_name,user_gender,user_DOB,otp,req_time) VALUES ("+dummyuser.user_email+","+dummyuser.user_phone_number+","+dummyuser.user_password+","+dummyuser.user_name+","+dummyuser.user_gender+","+dummyuser.user_DOB+","+dummyuser.otp+","+dummyuser.req_time+")",function(err,result){
                            if (err) throw err;
                            res.json({message:'OTP sent !'});
                        });
                        //send response
                        
                    }
                    else if(response1.length==0 && response2.length !=0){
                        res.json({message:'Phone Number already registered'});
                    }
                    else if(response1.length!=0 && response2.length ==0)
                    {
                        res.json({message:'Email Id already registered'});
                        res.send('');
                    }
                    else{
                        res.json({message:'Both email and phone numbers are already registered !'});
                    }       

                }
            });
            
        }
    });
    


});







/*-----------------------------------------API STRUCTURE-----------------------------------------------
post{
    "otp":"",
    "phone":""
}
*/
router.post('/check',(req,res,next)=>{
    var now = new time.Date();
    now.setTimezone("Asia/Kolkata");
    var gotOTP = mysql.escape(req.body.otp);
    var gotPHONE = mysql.escape(req.body.phone);
    var reg_time = mysql.escape(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds());
    var reg_date = mysql.escape(now.getDate()+'/'+now.getMonth()+'/'+now.getYear());
    var user_id = '';
    conn.query("SELECT * FROM temp_user WHERE otp = "+gotOTP+" AND user_phone_number = "+gotPHONE, function(err, response) {
        if (err) throw err;
        if(response.length==1){
            user_id = ((response[0].user_name).toLowerCase()).slice(0,3)+( Math.floor(1000000 + Math.random() * 9000000)).toString();
            conn.query("INSERT INTO users(user_id,user_phone_number,user_email,user_password,user_name,user_gender,user_DOB,reg_date,reg_time) VALUES ('"+user_id+"','"+response[0].user_phone_number+"','"+response[0].user_email+"','"+response[0].user_password+"','"+response[0].user_name+"','"+response[0].user_gender+"','"+response[0].user_DOB+"',"+reg_date+","+reg_time+")",function(err,result){
                if (err) throw err;
                if(result){
                    conn.query("DELETE FROM temp_user WHERE user_phone_number ="+gotPHONE,function(err,result){
                        if (err) throw err;
                        res.json({message:'Registered Successfully !'});
                    });
                }
            });
        }
        else{
            res.json({message:'Invalid OTP!'});
        }
      });

    
    

});







module.exports = router;