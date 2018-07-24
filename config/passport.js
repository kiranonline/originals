// var passport = require('passport');
var pass;
var localStrategy = require('passport-local').Strategy;


module.exports = function(passport) {

    

passport.use( new localStrategy({
    usernameField:'phone',
    passwordField:'password',
    passReqToCallback: true
},
 function verifyCallback(req, username, password, done) {
     console.log("sad");
    if (!username || !password) {
        return done(null, false);
    }
    pass = mysql.query("Select * form userdetails where mobile = '" +username+ "'", function (err, rows) {
        if(err){
            return done(err);
        }
        if (rows.length == 0) {
            console.log("wrong phone");
            return done(null, false,req.flash('loginMessage', 'No user found.'));
        }
        pass = rows[0].password;
        if (pass != password) {
            console.log("wrong password");
            return done(null, false,req.flash('loginMessage', 'No user found.'));
        }
        user=rows[0];
        return done(null, user);
    });
}))


}
