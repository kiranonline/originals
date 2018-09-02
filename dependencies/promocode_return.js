var path = require('path');
var mysql = require('mysql');
var pool = require(path.join(__dirname,'connection.js'));

function returnPromocode()
{
    console.log("returnPromocode() called");
    pool.getConnection(function(err,conn){

        if(err) console.log(err);
        var promocodeReturned="false"
        var q="SELECT * FROM temp_order WHERE promocodeReturned="+mysql.escape(promocodeReturned);
        conn.query(q,(err2,res)=>{
           if(err2) console.log(err2)
           console.log(`length=${res.length}`);
           for(var i=0;i<res.length;i++)
            {    
                var user_id=res[i].user_id;
                var promocode=res[i].promocode;
                console.log(`user_id =${user_id} promocode=${promocode}`);
                var q2="SELECT * FROM userlist WHERE user_id="+mysql.escape(user_id);
                    conn.query(q2,(err3,res2)=>{
                    if(err3) console.log(err3)
                    if(res2.length==1)
                    {
                        var used_promocodes=JSON.parse(res2[0].used_promocodes);
                        var promocodes=used_promocodes['promocodes'];
                        for(var i=0;i<promocodes.length;i++)
                        {
                            console.log(`key=${promocodes[i]['name']}  value=${promocodes[i]['no']}`);
                            console.log(`${promocode} ${promocodes[i]['name']} ${promocode==promocodes[i]['name']}`);
                            if(promocode==promocodes[i]['name'])
                            {
                                console.log(`${promocode} matched`);
                                if(promocodes[i]['no']>1)
                                {
                                    var no=promocodes[i][1];
                                    promocodes[i][no]=parseInt(no)-1; 
                                } 
                                else{
                                    promocodes.splice(i,1);
                                }
                                var dict={'promocodes':promocodes};
                                updateQuery(order_id,user_id,dict,function(){
                                    console.log(`updateQuery() callback...${promocodes[i]['name']} returned`);
                                });
                            }
                            else{
                                console.log("not matched");
                            }
                        }
                    }
                });
            }
        });
    });
}



function updateQuery(order_id,user_id,dict,callback)
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
                var promocodeReturned="true"
                var query2="UPDATE  temp_order SET promocodeReturned="+mysql.escape(promocodeReturned)+" WHERE order_id="+mysql.escape(order_id);
                conn.query(query2,function(err3,result2){
                    if(err3) console.log(err3);
                    callback();
                });     
            }
        });
        conn.release();

    });
}

module.exports=returnPromocode;