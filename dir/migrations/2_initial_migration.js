var crowdfunding = artifacts.require("CrowdFunding");

module.exports = function(deployer) {
  deployer.deploy(crowdfunding, ['Product1', 'Product2', 'Product3'], {gas: 6700000});
};