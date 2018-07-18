"use strict";


var express = require('express');
var router = express.Router();
var path = require('path');
var mysql = require('mysql');
var conn = require(path.join(__dirname,'/../../dependencies/connection.js'));
var fs=require('fs');
var uniqid = require('uniqid');
var trim = require('trim');


//get item sizes
router.post('/dashboard/category1',function(req,res){

	var query ="SELECT size FROM item_category_level1 WHERE name='"+req.body.category4+"'";
	//console.log(query);
	conn.query(query,function(err,result)
	{
		if(err) throw err;
		var r=JSON.parse(JSON.stringify(result));

		res.send(r[0].size);
		console.log("result");
		console.log(r[0].size);
	});
});






//main dashboard
router.get('/dashboard',function(req,res){
    if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
        res.render('admindashboardpage.handlebars',{ admindetails :req.session.admin });
    }
});


//create new category




//show items
router.get('/dashboard/item',function(req,res){
	
	
	var query="SELECT * FROM items";
	conn.query(query,function(err,result){
		console.log(result);
		res.render('adminitems.handlebars',{items:result});
	});
	
});





//add new item
router.get('/dashboard/item/new',function(req,res){
	
	//res.render('adminItemUpload.handlebars');
	var query1="SELECT name FROM item_category_level4;";
	
	var  query2="SELECT name FROM item_category_level3;";
	console.log("add item page");
	conn.query(query1, function (err4, result4) {
				if (err4) throw err4;
				conn.query(query2, function (err3, result3) {
				if (err3) throw err3;
				res.render('adminnewitempage.handlebars',{category4:result4,category3:result3});
				
		});
				
	});

	
});

router.post('/dashboard/item/new',function(req,res){
	 if(!req.session.admin){
        res.redirect('/admin/login');
    }
    else{
        console.log('dash');
        console.log(req.session.admin);
        //res.render('adminnewitempage.handlebars',{ layout: false,admindetails :req.session.admin, });
    }
	if(!req.files)
	{
		console.log("there's no file");
		return;
	}
	var name=req.body.name;
	var price=req.body.price;
	var id=uniqid('item-'); 	
	var size=req.body.size;
	var gender=req.body.gender;
	var event_type=req.body.event_type;
	var item_type=req.body.item_type;
	var added_by=req.session.admin.name;
	var added_on=new Date();
	var tags=req.body.tags;
	
	/*var t=tags.split(" ");

	var str="";
	for(var x=0;x<t.length;x++)
	{
		str=str+trim(t[x]);
		//str+=" ";

	}*/
	var str=tags.replace(/  +/g,' ');
	console.log(str);

	

	fs.mkdir('uploads/'+item_type+"/"+id,function(err){
		if (err) {
			//console.log("cant create directory");
		   return console.error(err);
		}

		console.log("Directory created successfully!");
		for(var i=0;i<req.files.file.length;i++)
		{
			console.log(req.files.file[i].name);
			var file=req.files.file[i];
			file.mv('././uploads/'+item_type+"/"+id+"/"+req.files.file[i].name,function(err){
				if(err) throw err
				console.log("file moved ");
			});
		}
	 });
	//console.log("No fo image"+req.files.file.length);
	
	
	//console.log(req.files[0]);
	//console.log("no of images :"+req.files.itemImages.length);
	
	var query ="INSERT INTO items (id,name,price,size,gender,event_type,item_type,tags,added_by,added_on) VALUES ('"+id+"',"+mysql.escape(name)+","+mysql.escape(price)+","+mysql.escape(size)+","+mysql.escape(gender)+","+mysql.escape(event_type)+","+mysql.escape(item_type)+",'"+str+"','"+added_by+"','"+added_on+"')";
	console.log(query);
	conn.query(query,function(err,result)
	{
		if(err) throw err;
		console.log("Item added to the database");
	});
	
	var query1="SELECT name FROM item_category_level4;";
	
	var  query2="SELECT name FROM item_category_level3;";
	console.log("add item page");
	conn.query(query1, function (err4, result4) {
				if (err4) throw err4;
				conn.query(query2, function (err3, result3) {
				if (err3) throw err3;
				res.render('adminnewitempage.handlebars',{category4:result4,category3:result3});
				
		});
				
	});

/*
	console.log(req.files.file.length);
	
	if(req.files.file.length!=0&&req.files.file.length<=6)
	{
		//var files=req.files;
		for(var i=0;i<req.files.file.length;i++)
		{
			console.log(req.files.file[i].name);
			var file=req.files.file[i];
			file.mv('././upload/'+req.files.file[i].name,function(err){
				if(err) throw err
				console.log("file moved ");
			});
		}
	}
	else
	{
		console.log("Please choose 1 to 6 files");
	}
	res.render('sampleFileUpload.handlebars')
*/
});






module.exports = router;