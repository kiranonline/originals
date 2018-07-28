var distance = require('google-distance-matrix');
var express=require('express');
var router = express.Router();

var api_key="";

distance.key(api_key);
router.post('/calc',function(req,res){


    var address=req.body.address;
    console.log("calculate distance called");
 
    var origins = ['22.991364,88.4466487'];
    var destinations = [address];
     
    distance.matrix(origins, destinations, function (err, distances) {
        if (!err)
            console.log(distances);
        
        if(distances.rows[0].elements[0].status=='OK')    
            res.send(distances.rows[0].elements[0].distance.text);
        else 
            {
                console.log("Invalid Location");
                res.send("invalid location");
            }
          //  res.send(distances.rows.elements.distance.text);
    });
});

router.get('/calc',function(req,res){


    res.render("calc.handlebars");
});
module.exports = router;