'use strict';
const truffle_connect = require('../../../connection/app.js');
var jwt = require('jsonwebtoken');
var config = require('../../../env.json')[process.env.NODE_ENV || 'development'];

exports.login = function(req, res) {  
   var address = req.body.address;
   var api_key = req.body.key;
   if(address == config.ADMIN_ADDRESS ){
   	 if(api_key == config.ADMIN_KEY){
        var token = jwt.sign({ client_address: config.ADMIN_ADDRESS,
        	contract_address:"0x0", is_admin:true }, config.SECRET, {
	      expiresIn: 86400 // expires in 24 hours
	    });

	    return res.status(200).send({ auth: true, token: token });
   	 }else{
   	   return res.status(404).send('No user found.');
   	 }
   }
  truffle_connect.getStoreContract(address, function (contract) {
    if (contract[1]=="0x0") return res.status(404).send('No contract found.');

    if (contract[0]!=api_key) return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ client_address: address,
          contract_address:contract[1], is_admin:false  }, config.SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    return res.status(200).send({ auth: true, token: token });
  },function(){
    return res.status(500).send('Error on the server.')
  });
};