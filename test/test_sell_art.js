var SellArt = artifacts.require("./SellArt.sol");

contract('SellArt', function(accounts) {


  it("should assert true", function() {
    return SellArt.deployed().then(function(instance){
       return instance.getOwner.call();
    }).then(function(owner){
        console.log(owner);
        assert.isTrue(true);
    });
    
  });

  it("should assign new artwork", function() {
    var meta;
   return SellArt.deployed().then(function(instance){
      meta = instance;
    	return meta.newArt.call(1,100);
    }).then(function(result){
       assert.isTrue(result,"the art already exists");
       return meta.getBuyer.call(1);
    }).then(function(buyer){
       assert.equal(0x0,buyer,"it should be empty buyer");
    });    
  });

  it("should assign and buy artwork", function() {
  	var meta;
  	return SellArt.deployed().then(function(instance){    	
       meta = instance;
    	 return meta.newArt(1,100,{from:accounts[0]});
    }).then(function(){
       return meta.buyArt(1,{ value:100 ,from:accounts[1]});
    }).then(function(result){
      // assert.isTrue(result,"it should return true");
       return meta.getBuyer.call(1);
    }).then(function(buyer){
       assert.equal(accounts[1],buyer,"buyer must be account 1");
    });    
  });

/*  it("Error in buying buy artwork", function() {
    var meta;
    return SellArt.deployed().then(function(instance){     
      meta = instance;
      return meta.newArt(1,100,{from:accounts[0]});
    }).then(function(){
      return meta.buyArt.call(1,{ value:110 ,from:accounts[1]});
    }).then(function(result){
     
      assert.isFalse(result,"It should revert and return false");
    });   
  });*/
});
