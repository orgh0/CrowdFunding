pragma solidity ^0.4.4;


contract Item {
    
    uint256 goal;
    uint256 deadline;
    string information;
    uint256 public amount_recieved;
    uint num_contributions;
    address CrowdFunding_platform;
    mapping (uint => donator) public donators;
    
    struct donator
    {
        uint256 donation;
        address addr;
    }
    
    constructor (string description, uint256 goal_amt, uint256 time, address owner) // should be called by the crowd funding platform
    {
        require(goal_amt > 0);
        require(block.number < time);
        require(owner != 0);
        goal = goal_amt;
        deadline = time;
        num_contributions = 0;
        CrowdFunding_platform = msg.sender;
        information = description;
        amount_recieved = 0;
    }
    
    function pay(address donor) payable returns (uint status)
    {
        require(msg.value > 0);
        require(msg.sender == CrowdFunding_platform);
        require(block.number < deadline);
        donator d = donators[num_contributions];
        d.donation = msg.value;
        d.addr = donor;
        
    }
}

contract CrowdFunding
{
    mapping (uint256 => address) public items;
    uint item_num ; // number of items in the CrowdFunding website
    address public owner;
    
    constructor () public
    {
        owner = msg.sender;
        item_num = 0;
    }
    
    function registeritem(string info, uint amount, uint time) payable returns (Item)
    {
        Item i = new Item(info, amount, time, msg.sender);
        items[item_num] = i;
        item_num = item_num + 1;
        return i;
    }
    
    function donate(address chosen_item) payable returns (int status)
    {
        require(msg.value > 0);
        Item chosen = Item(chosen_item);
        chosen.pay(msg.sender);
    }
}