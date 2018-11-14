const Item = artifacts.require("./crowdfunding.sol")
const assert = require('assert')

let contractInstance

contract("CrowdFunding", async(accounts) => {
	const contractor = accounts[0];
	const num_items = contractInstance.item_num.valueOf();
	const item1 = accounts[1];
	const item2 = accounts[2];

	beforeEach(async () => {
		contractInstance = await CrowdFunding.deployed({from : contractor})
	})

	it('Check that the items is not registered on the same address as that of the contractor', async() => {
		try{
			await contractInstance.registeritem("Item ABC", 1000, 1600, {from : contractor});
			assert.fail();
		}
		catch(e){
			assert.ok(true);
		}
	})

	it('Check that the donation value is valid, i.e., greater then zero', async() => {
		try{
			const Correct = await contractInstance.donate(1, {value: web3.toWei(0, "ether"), from: item1});
			assert.fail("Donation amount should be greater than zero")
		}
		catch(err){
			assert.ok(true);
		}
	})

	it('Check that the two items are not registered on the same address', async() => {
		try{
			for(var i = 1; i <= num_items; i++){
				for(var j = i+1; j < num_items; j++)
				{
					const Correct = await contractInstance.registeritem("Item ABC", 500, 400, {from: accounts[i]});
					const prevCount = await contractInstance.item_num.valueOf();
					assert.equal(prevCount, num_items, "There should be as many items in the crowd-funding platform as registered");

					Correct = await contractInstance.registeritem("Item PQR", 500, 400, {from: accounts[i]});
					assert.fail("Two items cannot have the same address");
				} 

			}
			//const Correct = await contractInstance.registeritem("Item ABC", 500, 400, {from: item1});
			//const prevCount = await contractInstance.item_num.valueOf();
			//assert.equal(prevCount, 2, "There should be two items in the crowd-funding platform");

			//Correct = await contractInstance.registeritem("Item PQR", 500, 400,{from: item1});
			//assert.fail("Two items cannot have the same address");
		}
		catch(err){
			assert.ok(true);
		}
	})
})
