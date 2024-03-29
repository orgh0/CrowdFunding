pragma solidity ^0.4.4;


contract Item {
    
    event failure(string report);

    uint256 goal;
    uint256 deadline;
    string information;
    uint256 public amount_recieved;
    uint num_contributions;
    address CrowdFunding_platform;
    mapping (uint => donator) public donators;
    mapping (address => uint) public donator_mapper;
    address product_owner;
    
    struct donator
    {
        uint256 donation;
        address addr;
    }
    
    constructor (string description, uint256 goal_amt, uint256 time, address owner) public // should be called by the crowd funding platform
    {
        // require(goal_amt > 0);
        // require(block.number < time);
        if (goal_amt <= 0)
        {
            failure("goal amount recieved must be vaild");
            throw;
        }
        if (owner == 0)
        {
            failure("Project must have a vaild owner");
            throw;
        }
        goal = goal_amt;
        deadline = block.number + time;
        num_contributions = 0;
        CrowdFunding_platform = msg.sender;
        information = description;
        amount_recieved = 0;
        product_owner = owner;
    }
    
    function get_item() returns(string, uint256, uint256, address, uint256, uint)
    {
        return (information, goal, deadline, product_owner, amount_recieved, num_contributions);
    }
    
    function make_transaction() payable public returns (bool status)
    {
        uint  amt_val = amount_recieved;
        amount_recieved = 0;
        if (product_owner.send(amt_val)) return true;
        else
        {
            amount_recieved = amt_val;
            return false;
        }
        return true;
    }
    
    function refund() payable external returns(bool status)
    {
        require(block.number > deadline);
        require(amount_recieved < goal);
        uint amt = donator_mapper[msg.sender];
        donator_mapper[msg.sender] = 0;
        if (msg.sender.send(amt)) return true;
        else
        {
            donator_mapper[msg.sender] = amt;
            return false;
        }
        return true;
    }
    
    function pay(address donor) payable external returns (bool status)
    {
        // require(msg.value > 0); // Donation shouldn't be zero'
        if (msg.value <= 0)
        {
            failure("Value of the contrubution must be greater than zero");
            throw;
        }
        // require(msg.sender == CrowdFunding_platform); // only the platform can make transactions
        if (msg.sender != CrowdFunding_platform)
        {
            failure("contrubution can only be made from the platform");
            throw;
        }
        // require(block.number < deadline); // the deadline musn't have been crossed
        if(block.number > deadline)
        {
            failure("Deadline for accepting contributions has passed");
            throw;
        }
        
        if (amount_recieved >= goal)
        {
            if (!donor.send(msg.value))
            {
                failure("Project Deadline passed, problem returning contribution");
                revert();
            }
            make_transaction();
            return false;
        }
        
        uint val = donator_mapper[donor]; // amount contributed by donor till now
        
        donator storage d = donators[num_contributions]; // making a new donator
        
        d.donation = msg.value; //seting donation value
        
        d.addr = donor; // setting donator's address'
        
        donator_mapper[donor] += msg.value; // increasing this donators donation count
        
        amount_recieved += msg.value; //increasing the total amount recieved by this item
        
        num_contributions++; // updating the number of contrubutions made
        
        if (val == 0) num_contributions++; // if the previous contribution was zero the 
        
        if(amount_recieved >= goal)make_transaction(); // if the goal is reached after this transaction then make the transaction
        
        return true;
    }
}


contract CrowdFunding
{
    event failure(string report);
    
    mapping (uint256 => address) public items;
    uint item_num ; // number of items in the CrowdFunding website
    address public owner;
    
    constructor () public
    {
        owner = msg.sender;
        item_num = 0;
    }
    
    function registeritem(string info, uint256 amount, uint256 time) payable returns (Item item_addr)
    {
        if (amount <= 0)
        {
            failure("Target amount has to be a valid number");
            throw;
        }
        Item i = new Item (info, amount, time, msg.sender);
        items[item_num] = i;
        item_num = item_num + 1;
        return i;
    }
    
    function donate(uint256 index) public payable returns (bool status)
    {
        address chosen_item = items[index];
        require(msg.value > 0);
        Item chosen = Item(chosen_item);
        if(chosen.pay.value(msg.value)(msg.sender))
        {
            return true;
        }
        else
        {
            failure("Contribution Not Sent Succesfully");
            return false;
        }
        return true;
    }
    
    // function show_items() public
    // {
    //     for(uint i = 0; i < item_num; i++)
    //     {
    //         address temp = items[i];
    //         Item temp_item = Item(temp);
    //     }
    // }
}