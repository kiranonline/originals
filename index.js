"use strict";


//initilisisng dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const fileUpload = require('express-fileupload');
const fs =  require('fs');
const flash = require('express-flash');
var uniqid = require('uniqid');
var passport = require('passport');
var csurf = require('csurf');
var helmet = require('helmet');
var cookieSession = require('cookie-session');
const csp = require('express-csp-header');

//app initialization
var app = express();

/////
var ExpressBrute = require('express-brute');
var SequelizeStore = require('express-brute-sequelize');
var Sequelize = require('sequelize');
 
var sequelize = new Sequelize('originals', 'root', '', {
  host: "localhost",
  dialect: "mysql",
  logging: false
});
 
new SequelizeStore(sequelize, 'bruteStore', {}, function(store) {
    var bruteforce = new ExpressBrute(store);
    app.get('/',
        bruteforce.prevent, // error 403 if too many requests for this route in short time
        function(req, res, next){
            res.send('Success!');
        }
    );
});
////////

//local routes
//for admins
var adminRegister = require('./routes/admin/adminregister.js');
var adminLogin = require('./routes/admin/adminlogin.js');
var adminDashboard = require('./routes/admin/admindashboardpage');
var userLogin = require('./routes/user/userlogin.js');
var userRegister = require('./routes/user/userregister.js');
//for users
//store
var store = require('./routes/website/store.js');




//header limitations
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

//helmet

app.use(helmet());
app.use(helmet({
    frameguard: {
      action: 'deny'
    }
  }));
app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

// Feature Policy
app.use(function(req, res, next) {
    res.header("Feature-Policy","geolocation '*'; midi 'none'; notifications '*'; push '*'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; vibrate 'none'; fullscreen 'none'; payment '*'")
    next();
});

// CSP
app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, csp.NONCE,'cdnjs.cloudflare.com'],
        'style-src': [csp.SELF, csp.NONCE,'fonts.googleapis.com','cdnjs.cloudflare.com','stackpath.bootstrapcdn.com'],
        'img-src': [csp.SELF, csp.NONCE],
        'font-src':[csp.NONCE,csp.SELF,'fonts.gstatic.com'],
        // 'block-all-mixed-content': true
    }
}));


//Rate limiter


//csrf token
var csrf = csurf({ cookie: true })




//setting up server
const port=process.env.port || 8300;


//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({extname:'handlebars', defaultLayout:'../main.handlebars'}));
app.set('view engine','handlebars');

//for morgan
app.use(morgan('dev'));

//for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//cookie parsor
app.use(expressValidator());
app.use(cookieParser('secret'));



//seting up file uploader
app.use(fileUpload());



//session
app.use(session({
    key: 'session_originals',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        secure: true,
        httpOnly: true
    },
    store:new MySQLStore({
        host:'localhost',
        user:'root',
        password:'',
        database:'originals',
        clearExpired: true,
        checkExpirationInterval: 6000,
        expiration: 3600000,
        createDatabaseTable: true,
        connectionLimit: 1,
        endConnectionOnClose: true,
        charset: 'utf8mb4_bin',
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    })
  }));

  

  //flash message
  app.use(flash());




//static folder
app.use(express.static(path.join(__dirname,'assets'),{
    
}));


app.use(csrf);


//routes url
app.use('/admin',adminRegister);
app.use('/admin',adminLogin);
app.use('/admin',adminDashboard);
app.use('/',store);
app.use('/',userRegister);
app.use('/',userLogin);



// passport

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport); 





//error handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.render('404page.handlebars');
});






//run server

app.listen(port,function(err){
    if(!err){
        console.log('Originals Server Started !',port);
    }
    else{
        console.log(err);
    }    
});