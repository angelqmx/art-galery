const contract = require('truffle-contract');

const store_artifact = require('../build/contracts/SellArt.json');
var config = require('../env.json')[process.env.NODE_ENV || 'development'];
var Store = contract(store_artifact);

module.exports = {
  accounts: function(callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[0];

      callback(self.accounts);
    });
  },
  balance: function(callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    return web3.eth.getBalance(Store.address);
  },
  owner: function(callback) {
    var self = this;
    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    Store.deployed().then(function(instance){
       return instance.getOwner.call();
    }).then(function(owner){
       callback(owner);
    });
  },
  addArt: function(address,name,author,image,price,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);
    self.web3.eth.defaultAccount=config.ADMIN_ADDRESS;
    console.log(config.ADMIN_ADDRESS);
    var meta;
    Store.deployed().then(function(instance) {
      meta = instance;
      console.log(self.web3.toWei(price, "ether"));
      return meta.addArt(address,name,author,image,self.web3.toWei(price, "ether"),{gas:900000});
    }).then(function(value) {
        callback();
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  countArt: function(callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
      Store.deployed().then(function(instance) {
      meta = instance;
      return meta.getArtWorkCount.call();
    }).then(function(value) {
        callback(value);
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  getArt: function(pos,callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
      Store.deployed().then(function(instance) {
      meta = instance;
      return meta.getArtWork.call(pos);
    }).then(function(value) {
        callback(value);
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },
  purchaseArt: function( id,price, callback) {
    var self = this;

    // Bootstrap the Store abstraction for Use.
    Store.setProvider(self.web3.currentProvider);

    var meta;
    Store.deployed().then(function(instance) {
      meta = instance;
      return meta.purchasesArt(id,{from: config.ADMIN_ADDRESS, 
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
