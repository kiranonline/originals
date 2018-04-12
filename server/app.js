var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const morgan = require('morgan');




//local routes files
var store = require('./routes/store.js');
var registeruser = require('./routes/registeruser.js');


//setting up server
var port = process.env.port || 8200;
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();

});

//all the routes
app.use('/',store);
app.use('/registeruser',registeruser);


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
            message:error.message
        } 
    });
});







app.listen(port,function(){
    console.log('Originals Server Started !');
});