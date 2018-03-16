'use strict';
const truffle_connect = require('../../connection/app.js');
var async = require('async');

exports.list_all = function(req, res) {  

  truffle_connect.countArt(function (answer) {
    console.log(answer.toNumber());
    var count = answer.toNumber();
    var index = [];
    var arts=[];
    console.log(count);
    for(var i = 1; i <= count;i++){
        index.push(i);
    }
    async.each(index, function(i,callback){
        truffle_connect.getArt(i,function(art){
        	arts.push({id:art[0].toNumber(),
        		artist:art[1],
        	    name:art[2],
        	    author:art[3],
        	    price:art[4].toNumber(),
        	    imageUrl:art[5],
                sold:art[6]
        	});
        	callback();
        })
    }, function(err){
	  res.json(arts);
	});
  });
};

exports.owner = function(req,res){
    truffle_connect.owner(function (answer) {
    	res.json({address:answer});
    });
};



exports.createArt = function(req, res) {
	truffle_connect.addArt(req.body.address,req.body.name,req.body.author,
		req.body.image,req.body.price,function(){
		res.status(201).json({succes:true}); 
	});   
};


exports.read_a_product = function(req, res) {
  res.json({});
};


exports.update_a_product = function(req, res) {
   res.json({}); 
};


exports.delete_a_product = function(req, res) {
  res.json({ message: 'Task successfully deleted' });
};

exports.purchase_a_product = function(req, res) {
    var id = req.params.productId;
    var price = req.body.price;
    truffle_connect.purchaseArt(id,price,function(){
        res.status(200).json({succes:true}); 
    });
};