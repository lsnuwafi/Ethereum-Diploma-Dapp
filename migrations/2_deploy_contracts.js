var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PlatForm = artifacts.require("./Platform.sol");

module.exports = function(deployer) {
  deployer.deploy(PlatForm)
  // .then(() => deployer.deploy(DiplomaViewer))
  // .then(() => deployer.deploy(Institution))
  // .then(() => deployer.deploy(Person))
};
