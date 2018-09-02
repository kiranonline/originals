var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname,'connection.js'));

function returnPromocode(order_id,callback)
{
    pool.getConnection(function(err,conn){

        if(err) console.log(err);
        var promocodeReturned="false"
        var q="SELECT * FROM temp_order WHERE promocodeReturned="=mysql.escape(promocodeReturned);
        conn.query(q,(err2,res)=>{
           if(err2) console.log(err2)
           if(res.length==1)
           {
               var user_id=res[0].user_id;
               var promocode=res[0].promocode;
               var q2="SELECT * FROM userlist WHERE user_id="=mysql.escape(user_id);
                conn.query(q2,(err3,res2)=>{
                if(err3) console.log(err3)
                if(res2.length==1)
                {
                    var used_promocodes=JSON.parse(result[0].used_promocodes);
                    var promocodes=used_promocodes['promocodes'];
                    for(var i=0;i<promocodes.length;i++)
                    {
                        console.log(`key=${promocodes[i]['name']}  value=${promocodes[i]['no']}`);
                        if(promocode==promocodes[i]['name'])
                        {
                            if(promocodes[i]['no']>1)
                            {
                                var no=promocodes[i][1];
                                promocodes[i][no]=parseInt(no)-1; 
                                
                                
                            } 
                            else{
                                promocodes.slice(i,1);
                            }
                            var dict={'promocodes':promocodes};
                            updateQuery(user_id,dict,req,function(){
                                console.log(`updateQuery() callback...${promocodes[i]['name']} returned`);
                                callback(1);
                            });
                            return;
                        }
                    }
                }

           } 
        });
    });
}



function updateQuery(user_id,dict,req,callback)
{
    console.log("updateQuery() called");
    pool.getConnection((err,conn)=>{
        if(err){
            console.log(err);
        }
        var query="UPDATE  userlist SET used_promocodes="+mysql.escape(JSON.stringify(dict))+" WHERE user_id="+mysql.escape(user_id);
        conn.query(query,function(err2,result){
    
            if(err2) console.log(err2);
            if(result.affectedRows==1)
            {
                console.log("New Used_promocodes:\n");
                console.log(dict);
                callback();
            }
           
        });
        conn.release();

    });
}