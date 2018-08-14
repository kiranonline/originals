var express=require('express');
var router = express.Router();

router.get('/error',(req,res)=>{

    res.status(404);
});

module.exports=router;