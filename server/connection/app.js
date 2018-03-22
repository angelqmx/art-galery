const contract = require('truffle-contract');

const store_creator_artifact = require('../build/contracts/StoreCreator.json');
const store_artifact = require('../build/contracts/Store.json');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];
var Store = contract(store_artifact);
var StoreCreator = contract(store_creator_artifact);

module.exports = {

  createContract: function(address,key,callback,error) {
    var self = this;
    // Bootstrap the Store abstraction for Use.
    StoreCreator.setProvider(self.web3.currentProvider);
    self.web3.eth.defaultAccount=config.ADMIN_ADDRESS;
   
    StoreCreator.deployed().then(function(instance){
       return instance.createContract(address,key,{from:config.ADMIN_ADDRESS,gas:2008000});
    }).then(function(){
      callback();
    }).catch(function(){
      error();
    });
  },
  getStoreContract: function(address,callback,error) {
    var self = this;
    // Bootstrap the Store abstraction for Use.
    StoreCreator.setProvider(self.web3.currentProvider);
    self.web3.eth.defaultAccount=config.ADMIN_ADDRESS;

    // Get the initial account balance so it can be displayed.
    StoreCreator.deployed().then(function(instance){
       return instance.getContract.call(address,{from:config.ADMIN_ADDRESS});
    }).then(function(contract){
      callback(contract);
    }).catch(function(){
      error();
    });
  },
  balance: function(contractAddress,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    return web3.eth.getBalance(contractAddress);
  },
  owner: function(contractAddress,callback) {
    var self = this;
    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    Store.at(contractAddress).then(function(instance){
       return instance.getOwner.call();
    }).then(function(owner){
       callback(owner);
    });
  },
  addArt: function(ownerAddress,contractAddress,address,name,author,image,price,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);
    
    var meta;

    Store.at(contractAddress).then(function(instance) {
      meta = instance;
    
      console.log(self.web3.toWei(price, "ether"));
      return meta.addArt(address,name,author,image,self.web3.toWei(price, "ether"),{from:ownerAddress,gas:900000});
    }).then(function(value) {
        callback();
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  updateArt: function(ownerAddress,contractAddress,id,address,name,author,image,price,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);
   
    console.log(config.ADMIN_ADDRESS);
    var meta;
    Store.at(contractAddress).then(function(instance) {
      meta = instance;
      return meta.updateArt(id,address,name,author,image,self.web3.toWei(price, "ether"),{from:ownerAddress,gas:900000});
    }).then(function(value) {
        callback();
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  countArt: function(ownerAddress,contractAddress,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
      Store.at(contractAddress).then(function(instance) {
      meta = instance;
      return meta.getArtCount.call();
    }).then(function(value) {
        callback(value);
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  getArt: function(ownerAddress,contractAddress,pos,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
    Store.at(contractAddress).then(function(instance) {
      meta = instance;
      return meta.getArt.call(pos);
    }).then(function(value) {
        callback(value);
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  purchaseArt: function(ownerAddress,contractAddress, id,price, callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
    Store.at(contractAddress).then(function(instance) {
      meta = instance;
      return meta.purchasesArt(id,{from: ownerAddress, 
          value: price,
          gas: 90000
        });;
    }).then(function() {
        callback();      
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
