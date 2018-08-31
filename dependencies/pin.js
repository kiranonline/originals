var fs = require("fs");
var path = require('path');



function pin_check(pin,callback){
    
    fs.readFile(path.join(__dirname,'pins.txt'), function (err, data) {
        if (err) {
           return console.error(err);
        }
        data=data.toString();
        console.log(data);
        var status;
        data = data.split(',');
        var d_l = data.length;
        var i;
        for(i=0;i<d_l;i++){
            if(data[i]==pin){
                status={
                    status:"Found"
                }
                return callback(status);
            }
            if(i==d_l-1){
                status={
                    status:"Not Found"
                }
                return callback(status);
            }
        }
       
     });
   

    
}














module.exports = pin_check;