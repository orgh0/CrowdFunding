import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

const CrowdFundingABI = [
  {
	"constant": false,
	"inputs": [
	  {
		"name": "chosen_item",
		"type": "address"
	  }
	],
	"name": "donate",
	"outputs": [
	  {
		"name": "status",
		"type": "int256"
	  }
	],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "owner",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"name": "items",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": false,
	"inputs": [
	  {
		"name": "info",
		"type": "string"
	  },
	  {
		"name": "amount",
		"type": "uint256"
	  },
	  {
		"name": "time",
		"type": "uint256"
	  }
	],
	"name": "registeritem",
	"outputs": [
	  {
		"name": "",
		"type": "address"
	  }
	],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "item_num",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"inputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
  }
]

const ItemABI = [
  {
	"constant": false,
	"inputs": [
	  {
		"name": "donor",
		"type": "address"
	  }
	],
	"name": "pay",
	"outputs": [
	  {
		"name": "status",
		"type": "uint256"
	  }
	],
	"payable": true,
	"stateMutability": "payable",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "amount_received",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "deadline",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "goal",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "num_contributions",
	"outputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [
	  {
		"name": "",
		"type": "uint256"
	  }
	],
	"name": "donators",
	"outputs": [
	  {
		"name": "donation",
		"type": "uint256"
	  },
	  {
		"name": "addr",
		"type": "address"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"constant": true,
	"inputs": [],
	"name": "information",
	"outputs": [
	  {
		"name": "",
		"type": "string"
	  }
	],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
  },
  {
	"inputs": [
	  {
		"name": "description",
		"type": "string"
	  },
	  {
		"name": "goal_amt",
		"type": "uint256"
	  },
	  {
		"name": "time",
		"type": "uint256"
	  },
	  {
		"name": "owner",
		"type": "address"
	  }
	],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "constructor"
  }
]

web3.eth.defaultAccount = web3.eth.accounts[0]
const CrowdFundingContract=web3.eth.contract(CrowdFundingABI);
const ItemContract=web3.eth.contract(ItemABI);

export {CrowdFundingContract, ItemContract};
