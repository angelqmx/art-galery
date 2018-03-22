var StoreCreator = artifacts.require("StoreCreator");

module.exports = function(deployer) {
  deployer.deploy(StoreCreator);
};