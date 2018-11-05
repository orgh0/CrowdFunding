pragma solidity ^0.4.24;

contract CrowdFunding
{
    mapping (bytes32 => uint8) public count;
     
    bytes32[] public TestList;

    function CrowdFunding(bytes32[] Elements) public {
        TestList = Elements;
    }

    function totalCountFor(bytes32 element) view public returns (uint8) {
        return count[element];
    }

    function CountForItems(bytes32 element) public {
        count[element] += 1;
    }
}