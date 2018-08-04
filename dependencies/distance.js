var distance = require('google-distance-matrix');

var api_key="";

distance.key(api_key);

function getDistance(destination,callback){

    var origins = ['22.991364,88.4466487'];
    var destinations = [destination];


    distance.matrix(origins, destinations, function (err, distances) {
        if (!err)
            console.log(distances);
        
        if(distances.rows[0].elements[0].status=='OK')    
            //res.send(distances.rows[0].elements[0].distance.text);
            callback(null,distances.rows[0].elements[0].distance.text);
        else 
            {
                console.log("Invalid Location");
                //res.send("invalid location");
                callback('Invalid Location',null);
            }
          
    });




}







module.exports = getDistance;
