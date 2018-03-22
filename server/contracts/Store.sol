pragma solidity ^0.4.4;

contract Counter{
   uint serial ;
   function Counter() public {
       serial = 0;
   }
   function val() public view returns(uint){
       return serial;
   }  
}

contract Owned {
    address public owner;

    function Owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        assert(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        if (newOwner != address(0)) {
            owner = newOwner;
        }
    }
}

contract Store is Counter, Owned {

  struct  Art {
    uint id;
    address owner;
    string  name;
    string  ownername;
    uint    price;  
    string  imageUrl;
    bool sold;
  }

  mapping (uint =>  Art)  public artworks;
 
  
  function addArt(address _owner,string _name,string _ownername,string _imageUrl, uint _price) public  returns (bool)  {
    serial++;
    Art memory a =  Art (serial,_owner,_name, _ownername ,_price, _imageUrl,false);  
    artworks[serial] = a;  
    return true;
  }

  function updateArt(uint id, address _owner,string _name,string _ownername,string _imageUrl, uint _price) public  {
    Art storage di = artworks[id];
    di.owner = _owner;
    di.name = _name;
    di.ownername = _ownername;
    di.price = _price;
    di.imageUrl = _imageUrl;
  }

  function getArtCount() public constant returns(uint count) {
    return serial;
  }

  function getOwner() public view returns (address)  {
    return owner;
  }


  function getArt(uint pos) public view returns ( uint , address , string , string , uint price, string , bool ) {
    Art memory di = artworks[pos];
    return (di.id,di.owner, di.name, di.ownername,di.price,di.imageUrl,di.sold);
  }
  

  function purchasesArt(uint id) public payable  {

    Art storage a = artworks[id];
   

    a.owner.transfer(a.price);
    a.sold=true;
  }
}
