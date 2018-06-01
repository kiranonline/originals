"use strict";




//initilisisng dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const morgan = require('morgan');





//local routes
//for admins
var adminLogin = require('./routes/admin/adminlogin.js');
var adminRegister = require('./routes/admin/adminregister.js');
//for users
var userLogin = require('./routes/user/userlogin.js');
var userRegister = require('./routes/user/userregister.js');






//setting up server
const port=process.env.port || 8100;
var app = express();
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs());
app.set('view engine','handlebars');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



//static folder
app.use(express.static(path.join(__dirname,'assets')));






//routes
app.use('/',adminLogin);








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

app.listen(port,function(){
    console.log('Originals Server Started !',port);
});
