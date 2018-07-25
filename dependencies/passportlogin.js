var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var md5 = require('md5');
var path = require('path');
var conn = require(path.join(__dirname,'/connection.js'));





passport.use('local', new LocalStrategy({

    usernameField: 'phone',
  
    passwordField: 'password',
  
    passReqToCallback: true //passback entire req to call back
  } , function (req, phone, password, done){
  
        if(!phone || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
    
        conn.query("SELECT * FROM userlist WHERE phone = ?", [phone], function(err, rows){
  
            console.log(err); console.log(rows);
  
          if (err) return done(req.flash('message',err));
  
          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
  
  
          var encPassword = md5(password);
  
  
          var dbPassword  = rows[0].password;
  
          if(!(dbPassword == encPassword)){
  
              return done(null, false, req.flash('message','Invalid username or password.'));
  
           }
  
          return done(null, rows[0]);
  
        });
  
      }
  
  ));





passport.serializeUser(function(user, done){

    done(null, user.phone);

});

passport.deserializeUser(function(phone, done){

    conn.query("SELECT * FROM userlist WHERE phone = "+ phone, function (err, rows){

        done(err, rows[0]);

    });

});














module.exports = passport;