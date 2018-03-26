'use strict';
const truffle_connect = require('../../connection/app.js');
var async = require('async');
var randomstring = require("randomstring");
var jwt = require('jsonwebtoken');

exports.createStore = function(req, res) {  
  var client = req.body.address;
  var key = randomstring.generate({
              length: 20,
              charset: 'alphanumeric',
              capitalization: 'uppercase'
            });
  truffle_connect.createContract(client,key,function (answer) {
     res.json({succes:true,api_key:key});
  }, function (error){
    res.status(501).json({"error":error});
  });
};

exports.getStoreContract = function(req, res) {  
  var client = req.body.address;
  var key = req.body.api_key;
 
  truffle_connect.getStore(client,key,function (answer) {
     res.json({succes:true,api_key:key});
  }, function (error){
    res.status(501).json({"error":error});
  });
};


exports.list_all = function(req, res) {  

  truffle_connect.countArt(req.client_address,req.contract_address, function (answer) {
   
    var count = answer.toNumber();
    var index = [];
    var arts=[];
   
    for(var i = 1; i <= count;i++){
        index.push(i);
    }
    async.each(index, function(i,callback){
        truffle_connect.getArt(req.client_address,req.contract_address,i,function(art){
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
    truffle_connect.owner(req.contract_address,function (answer) {
    	res.json({address:answer});
    });
};



exports.createArt = function(req, res) {
	truffle_connect.addArt(req.client_address,req.contract_address,
    req.body.address,req.body.name,req.body.author,
		req.body.image,req.body.price,function(){
		res.status(201).json({succes:true}); 
	});   
};


exports.read_a_product = function(req, res) {
    console.log(req.params.productId)
    truffle_connect.getArt(req.client_address,req.contract_address,req.params.productId,function(art){
        res.status(200).json({id:art[0].toNumber(),
                artist:art[1],
                name:art[2],
                author:art[3],
                price:art[4].toNumber(),
                imageUrl:art[5],
                sold:art[6]
        }); 
    });   
};


exports.update_a_product = function(req, res) {
    truffle_connect.updateArt(req.client_address,req.client_address,req.contract_address,
        req.params.productId
        ,req.body.address,req.body.name,req.body.author,
        req.body.image,req.body.price,function(){
        res.status(200).json({succes:true}); 
    });  
};


exports.delete_a_product = function(req, res) {
  res.json({ message: 'Task successfully deleted' });
};

exports.purchase_a_product = function(req, res) {
    var id = req.params.productId;
    var price = req.body.price;
    truffle_connect.purchaseArt(req.client_address,req.contract_address,id,price,function(){
        res.status(200).json({succes:true}); 
    });
};