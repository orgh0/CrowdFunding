var crowdfunding = artifacts.require("CrowdFunding");

module.exports = function(deployer) {
  deployer.deploy(crowdfunding);
};