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
var flash = require('connect-flash');
var uniqid = require('uniqid');
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var csurf = require('csurf');
var helmet = require('helmet');
const csp = require('express-csp-header');
var returnPromocode = require(path.join(__dirname, '/dependencies/promocode_return.js'));

var cron=require('node-cron');




//----------------------webpush notification-------------------
const webpush = require('web-push');
const publicVapidKey = 'BNSNBlyOuhqiVdXpNeykqQeuW1teX5UMtvKKmpFf3Xp5XmCKwX4o23Se9u5I2DGZImTmkxuMm-G2BLNZYdvmgoo';
const privateVapidKey = '0PA3A5mym1C_fW62zah-8MbQ1Nm-K_CsBC5tQAypZe0';
webpush.setVapidDetails('mailto:test@test.com',publicVapidKey,privateVapidKey);









// Brute Force protection
var ExpressBrute = require('express-brute');
var SequelizeStore = require('express-brute-sequelize');
var Sequelize = require('sequelize');

/*var sequelize = new Sequelize('theoriginals_db1', 'admin_theoriginals', 'TheOriginals@13579', {                                                          host: "localhost",                                                    
    dialect: "mysql",                                                          
logging: false                                                         
  }); 
*/ var sequelize = new Sequelize('localhost', 'root', '', {                                                          host: "localhost",                                                    
    dialect: "mysql",                                                          
    logging: false                                                         
  });  


//app initialization
var app = express();


//local routes
//for admins
var adminRegister = require('./routes/admin/adminregister.js');
var adminLogin = require('./routes/admin/adminlogin.js');
var adminDashboard = require('./routes/admin/admindashboardpage');
//for users
var userLogin = require('./routes/user/userlogin.js');
var userRegister = require('./routes/user/userregister.js');
var userAction = require('./routes/user/useraction.js')
//store
var store = require('./routes/website/store.js');
var cartOrder = require('./routes/website/cart.js');
var address = require('./routes/website/address.js');
var promocode=require('./routes/website/promocode.js');
var order=require('./routes/website/order.js');
var payment=require('./routes/website/payment.js');
var cashback=require('./routes/admin/cashback.js');
var error=require('./routes/website/errorpage.js');



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
    res.header("Feature-Policy","geolocation '*'; midi 'none'; sync-xhr 'none'; microphone 'none'; camera 'none'; magnetometer 'none'; gyroscope 'none'; speaker 'none'; vibrate 'none'; fullscreen 'none'; payment '*'")
    next();
});

// CSP
/*app.use(csp({
    policies: {
        'default-src': [csp.SELF],
        'script-src': [csp.SELF, csp.NONCE,'cdnjs.cloudflare.com'],
        'style-src': [csp.SELF, csp.NONCE,'fonts.googleapis.com','cdnjs.cloudflare.com','stackpath.bootstrapcdn.com'],
        'img-src': [csp.SELF, csp.NONCE],
        'font-src':[csp.NONCE,csp.SELF,'fonts.gstatic.com','cdnjs.cloudflare.com'],
        // 'block-all-mixed-content': true
    }
}));
*/



//setting up server
const port=process.env.port || 8100;


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


/*
var csrf = csurf({ cookie: true });
app.use(csrf);
*/

//seting up file uploader
app.use(fileUpload());


app.use(cookieParser('secret_The_Originals'));
//session
app.use(session({
    key: 'session_originals',
    secret: 'secret_The_Originals',
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
        // secure: true,
        httpOnly: true
    },
    store:new MySQLStore({
    
	host:'localhost',
        user:'root',
        password:'',
        database:'originals',
  /*
        host:'localhost',
        user:'admin_theoriginals',
        password:'TheOriginals@13579',
        database:'theoriginals_db1',
    */    
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
 
  app.use(flash()); 



  //
    app.use(passport.initialize());
    app.use(passport.session());


    //flash message




//static folder
app.use(express.static(path.join(__dirname,'assets'),{
    
}));

//CSRF 

//promocode_return
/*
setInterval(function(){
    returnPromocode();
},60000);*/
console.log("before cron");
var task = cron.schedule('59 * * * * *', function() {
    console.log(new Date());
    returnPromocode();
  });
console.log("after cron");

//routes url
app.use('/admin',adminRegister);
app.use('/admin',adminLogin);
app.use('/admin',adminDashboard);
app.use('/',store);
app.use('/',userRegister);
app.use('/',userLogin);
app.use('/',userAction);
app.use('/',cartOrder);
app.use('/address',address);
app.use('/promocode',promocode);
app.use('/',order);
app.use('/',payment);
app.use('/admin',cashback);
app.use('/',error);

app.get('/logout', function(req, res) {
    req.logout(); 
    res.redirect('/login');
});





//error handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.render('404page.handlebars',{layout:false});
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
