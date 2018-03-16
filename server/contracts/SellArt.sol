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

contract SellArt is Counter {

  struct  Art {
    uint id;
    address artist;
    string  name;
    string  author;
    uint    price;  
    string  imageUrl;
    bool sold;
  }

  address owner;  
   mapping (uint =>  Art)  public artworks;
 
  function SellArt() public {
    owner = msg.sender;
  }

  function addArt(address _artist,string _name,string _author,string _imageUrl, uint _price) public  returns (bool)  {
    serial++;
    Art memory a =  Art (serial,_artist,_name, _author ,_price, _imageUrl,false);  
    artworks[serial] = a;  
    return true;
  }

  function updateArt(uint id, address _artist,string _name,string _author,string _imageUrl, uint _price) public  {
    Art storage di = artworks[id];
    di.artist = _artist;
    di.name = _name;
    di.author = _author;
    di.price = _price;
    di.imageUrl = _imageUrl;
  }

  function getArtWorkCount() public constant returns(uint count) {
    return serial;
  }

  function getOwner() public view returns (address)  {
    return owner;
  }


  function getArtWork(uint pos) public view returns ( uint id, address artist, string name, string author, uint price, string imageUrl, bool sold) {
    Art memory di = artworks[pos];
    return (di.id,di.artist, di.name, di.author,di.price,di.imageUrl,di.sold);
  }
  

  function purchasesArt(uint id) public payable  {

    Art storage a = artworks[id];
   

    a.artist.transfer(a.price);
    a.sold=true;
  }
}
