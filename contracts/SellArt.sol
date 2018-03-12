pragma solidity ^0.4.4;


contract SellArt {

  struct  Art {
    address buyer;
    uint price;
    bool exist;
  }

  address owner;  
  mapping (uint => Art) artworks;
  uint[] public solds;

  function SellArt() public {
    owner = msg.sender;
  }

  function newArt(uint id,uint price) public  returns (bool)  {
    if(artworks[id].exist) { 
      return false;
    }
    Art storage a = artworks[id];  
    a.price = price;
    a.exist = true;
    return true;
  }

  function getBuyer(uint id) public view returns (address)  {
    Art storage a = artworks[id];
    return a.buyer;
  }

  function getOwner() public view returns (address)  {
    return owner;
  }


  function purchasesArt(uint id) public payable returns (bool)  {

    Art storage a = artworks[id];

   

    a.buyer = msg.sender;
    solds.push(id);

    return true;
  }

  function getArtWorks() public view returns (uint[]) {
    return solds;
  }
 
}
