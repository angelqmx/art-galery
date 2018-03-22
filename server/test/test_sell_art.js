var StoreCreator = artifacts.require("./StoreCreator.sol");
var Store = artifacts.require("./Store.sol");


contract('StoreCreator', function(accounts) {

  it("should Create a new Store", function() {
   var meta;
   var meta2;
   return StoreCreator.deployed().then(function(instance){
      meta = instance;
      return meta.createContract("0xf17f52151EbEF6C7334FAD080c5704D77216b732","123456789");
    }).then(function(result){
    
       return meta.getContract.call("0xf17f52151EbEF6C7334FAD080c5704D77216b732");
    }).then(function(c){  
      
       assert.equal(c[0],"123456789","it shoul be the same key");
       meta2 = Store.at(c[1]);
       return meta2.getOwner.call();
    }).then(function(_ownerStore){
       assert.equal(_ownerStore,"0xf17f52151ebef6c7334fad080c5704d77216b732","it shoul be the user 2");
       return meta2.addArt("0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef","Stared nigth","Anonymous","http://www.image.com",1222);
    }).then(function(result){
      // assert.isTrue(result,"Error adding art");
       return meta2.getArtCount.call();
    }).then(function(count){
       assert.equal(count.c[0],1,"it should be one art");
      return meta2.getArt.call(1);
    }).then(function(art){
      console.log(art);
      assert.equal(art[0].c[0],1,"it should be id 1");
      return meta2.updateArt(1,"0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef","Stared nigth","Anonymous","http://www.image.com",2000);
    }).then(function(){
      return meta2.getArt.call(1);
    }).then(function(art){
       console.log(art);
       assert.equal(art[4].c[0],2000,"it should be one art");
       return meta2.purchasesArt(1,{form:"0x627306090abaB3A6e1400e9345bC60c78a8BEf57",value:2000});
    }).then(function(art){
       return meta2.getArt.call(1);
    }).then(function(art){
       console.log(art);
       assert.isTrue(art[6],"it should be sold");       
    });;
  });


});
