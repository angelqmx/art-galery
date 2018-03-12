App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load arts.
    $.getJSON('../artworks.json', function(data) {
      var artsRow = $('#artsRow');
      var artTemplate = $('#artTemplate');

      for (i = 0; i < data.length; i ++) {
        artTemplate.find('.panel-title').text(data[i].name);
        artTemplate.find('img').attr('src', data[i].picture);
        artTemplate.find('.art-price').text(data[i].price);
        artTemplate.find('.art-author').text(data[i].author);
        artTemplate.find('.btn-buy').attr('data-id', data[i].id);
        artTemplate.find('.btn-buy').attr('data-price', data[i].price);

        artsRow.append(artTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://35.172.153.129:7545');
    }
    web3 = new Web3(App.web3Provider);

        return App.initContract();
      },

  initContract: function() {
    $.getJSON('SellArt.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var SellArtArtifact = data;
      App.contracts.SellArt = TruffleContract(SellArtArtifact);

      // Set the provider for our contract
      App.contracts.SellArt.setProvider(App.web3Provider);

  /*   $.getJSON('../artworks.json', function(arts) {
        
        App.contracts.SellArt.deployed().then(function(instance) {
          sellArtInstance = instance;
          for (i = 0; i < arts.length; i ++) {
            sellArtInstance.newArt(arts[i].id,arts[i].price);         
          }
        });
      });*/


   

      // Use our contract to retrieve and mark the adopted arts
      return App.markSold();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleSell);
  },

  markSold: function(artworks, account) {
    var sellArtInstance;

    App.contracts.SellArt.deployed().then(function(instance) {
      sellArtInstance = instance;

      return sellArtInstance.getArtWorks.call();
    }).then(function(artworks) {
      for (i = 0; i < artworks.length; i++) {
        console.log(artworks[i]);  
        $('.panel-art').eq((artworks[i].c[0]-1)).find('button').text('Sold').attr('disabled', true);
      }
    }).catch(function(err) {
      console.log(err.message);
    });

  },

  handleSell: function(event) {
    event.preventDefault();

    var artId = parseInt($(event.target).data('id'));
    var price = parseInt($(event.target).data('price'));

    var sellArtInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.SellArt.deployed().then(function(instance) {
        sellArtInstance = instance;

        // Execute adopt as a transaction by sending account
        console.log(account);
        return sellArtInstance.purchasesArt.sendTransaction(artId,{from: account, 
          value: '0x016345785d8a0000',
          gas: '0x4388', 
          gasPrice: '0x09502f9000'});
      }).then(function(result) {
        return App.markSold();
      }).catch(function(err) {
        console.log(err.message);
      });
    });

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
