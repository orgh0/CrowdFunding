pragma solidity ^0.4.4;

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
    
    function registeritem(string info, uint amount, uint time) payable
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