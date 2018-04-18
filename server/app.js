const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const exphbs = require('express-handlebars');
const expressvalidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;






//local routes files for api
var store = require('./routes/api/store.js');
var registeruser = require('./routes/api/registeruser.js');

//local routes files for admin
var adminLogin = require('./routes/admin/adminlogin.js');







//setting up server
var port = process.env.port || 8200;
var app = express();
app.set('views',path.join(__dirname,'routes/admin/views'));
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,X-Auth-Token, Content-Type, Accept, Authorization");
    next();

});





//static folder
app.use(express.static(path.join(__dirname,'routes/admin/assets')));



//express sessions
app.use(session({
    secret: 'secret',
    saveUninitialized:true,
    resave:true
}));



//flash middleware
app.use(flash());
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})





//all the routes api
app.use('/api',store);
app.use('/api/registeruser',registeruser);

//all the routes admin
app.use('/admin',adminLogin);













//error handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            status:error.status,
            message:error.message
        } 
    });
});







app.listen(port,function(){
    console.log('Originals Server Started !',port);
});