var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path');
var flash = require('connect-flash');
var pool= require(path.join(__dirname,'/connection.js'));
var uniqid = require('uniqid');






//------------------local--------------------------
passport.use('local', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'password',
  
    passReqToCallback: true //passback entire req to call back
  } , function (req, email, password, done){
  
        if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err);
            }
            conn.query("SELECT * FROM userlist WHERE email = ?", [email], function(err, rows){
  
                console.log(err);
      
              if (err) return done(req.flash('message',err));
      
              if(!rows.length){return done(null, false, req.flash('error','Invalid username or password.')); }
      
      
              var encPassword = md5(password);
      
      
              var dbPassword  = rows[0].password;
      
              if(!(dbPassword == encPassword)){
      
                  return done(null, false, req.flash('error','Invalid username or password.'));
      
               }
              //  addCartToSession(req,rows);
               
              return done(null, rows[0]);
      
            });
            conn.release();



        });
        
  
      }
  
  ));




passport.serializeUser(function(user, done){

    done(null, user.user_id);

});





passport.deserializeUser(function(user_id, done){
    
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        conn.query("SELECT * FROM userlist WHERE user_id = "+ mysql.escape(user_id), function (err, rows){
            
            done(err, rows[0]);
    
        });
        conn.release();

    });

    

});







//------------------------------------google login------------------

passport.use(new GoogleStrategy({
    clientID:'817128327500-gs2jm34bsl848ipdt9u5thuern2mg5k0.apps.googleusercontent.com',
    clientSecret:'r7AsAR1L3-GHiVHzbXJpH-o7',
    callbackURL:'https://the-originals.in/login/google/status'
},(accessToken, refreshToken, profile, done)=>{
    console.log(profile);
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var q1="SELECT * FROM userlist WHERE googleid="+mysql.escape(profile.id);
        conn.query(q1,(err,res1)=>{
            if(err){
                console.log(err);
            }
            if(res1.length==1){
                done(null,res1[0]);
            }
            else{
                var name=profile.displayName;
                var email=profile.emails[0].value;
                var gender=profile.gender;
                var cart="{\"items\":[]}";
                var user_id=uniqid();
                var q11="SELECT * FROM userlist WHERE email="+mysql.escape(email);
                conn.query(q11,(err,ress)=>{
                        if(err){
                            console.log(err);
                        }
                        if(ress.length>0){
                            console.log('This email is already registered');
                            return done(null, false);
                        }
                        else{
                            var q2="INSERT INTO userlist (user_id,googleid,name,email,gender,cart,timeofquery) VALUES ("+mysql.escape(user_id)+","+mysql.escape(profile.id)+","+mysql.escape(name)+","+mysql.escape(email)+","+mysql.escape(gender)+","+mysql.escape(cart)+","+mysql.escape(new Date())+")";
                            conn.query(q2,(err,res2)=>{
                                if(err){
                                    console.log(err);
                                    
                                }
                                var q3="SELECT * FROM userlist WHERE googleid="+mysql.escape(profile.id);
                                conn.query(q3,(err,res3)=>{
                                    if(err){
                                        console.log(err);
                                    }
                                    console.log('user regestered');
                                    done(null,res3[0]);
                                });                            
            
                            });
                        }
                            
                });
            }
        });
        conn.release();

    });


}));
























module.exports = passport;
