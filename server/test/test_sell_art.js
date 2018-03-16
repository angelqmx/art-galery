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
    	return meta.addArt("0xf17f52151EbEF6C7334FAD080c5704D77216b732","Stared nigth","Annonimous","http://www.image.com",1222);
    }).then(function(result){
      // assert.isTrue(result,"Error adding art");
       return meta.getArtWorkCount.call();
    }).then(function(count){
       assert.equal(count.c[0],1,"it should be one art");
       return meta.getArtWork.call(1);
    }).then(function(art){
      console.log(art);
      assert.equal(art[0].c[0],1,"it should be id 1");
      return meta.updateArt(1,"0xf17f52151EbEF6C7334FAD080c5704D77216b732","Stared nigth","Annonimous","http://www.image.com",2000);
    }).then(function(){
      return meta.getArtWork.call(1);
    }).then(function(art){
       console.log(art);
       assert.equal(art[4].c[0],2000,"it should be one art");
       return meta.purchasesArt(1,{form:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57",value:2000});
    }).then(function(art){
       return meta.getArtWork.call(1);
    }).then(function(art){
       console.log(art);
       assert.isTrue(art[6],"it should be sold");       
    });    
  });

 /* it("should assign and buy artwork", function() {
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
  });*/


});
