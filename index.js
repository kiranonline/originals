"use strict";


//initilisisng dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');



//app initialization
var app = express();


//local routes
//for admins
var adminRegister = require('./routes/admin/adminregister.js');
var adminLogin = require('./routes/admin/adminlogin.js');
var userLogin = require('./routes/user/userlogin.js');
var userRegister = require('./routes//user/userregister.js');
//for users




//header limitations
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//setting up server
const port=process.env.port || 8300;


//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');

//for morgan
app.use(morgan('dev'));

//for body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//static folder
app.use(express.static(path.join(__dirname,'assets')));





//routes url
app.use('/',adminRegister);
app.use('/',adminLogin);
app.use('/',userRegister);
app.use('/',userLogin);







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








//run server

app.listen(port,function(err){
    if(!err){
        console.log('Originals Server Started !',port);
    }
    else{
        console.log(err);
    }
    
});
