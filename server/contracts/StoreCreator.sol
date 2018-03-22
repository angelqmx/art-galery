pragma solidity ^0.4.4;

import "./Store.sol";

contract  StoreCreator is Owned {
 
  struct  StoresContract {
     string key;
     address storeContract;
  }
  
  mapping (address =>  StoresContract)  public contracts;


  function createContract (address _owner, string key) public {
      Store s = new Store();
      s.transferOwnership(_owner);
      StoresContract memory c =  StoresContract (key,s); 
      contracts[_owner] = c;
  }

  function getContract(address _owner) public view returns ( string , address )  {
    StoresContract memory c = contracts[_owner];
    return (c.key,c.storeContract);
  }
}
