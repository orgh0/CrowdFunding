import Web3 from 'web3';

const web3=new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
let CrowdFundingABI=[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"TestList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"count","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"Elements","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[{"name":"element","type":"bytes32"}],"name":"totalCountFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"element","type":"bytes32"}],"name":"CountForItems","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]
let CrowdFundingAddress='0x16ed979c0144701232b39964aa3a941a9a427567';
web3.eth.defaultAccount = web3.eth.accounts[0]


const CrowdFundingContract=web3.eth.contract(CrowdFundingABI).at(CrowdFundingAddress);
export {CrowdFundingContract};