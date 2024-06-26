// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Faucet {
    uint public numOfFunders;
    mapping(uint => address) private funders;

    receive() external payable {}
    
    function addFunds() external payable {
        numOfFunders++;
        funders[numOfFunders] = msg.sender;
    }

    function getAllFunders() external view returns (address[] memory) {
        address[] memory allFunders = new address[](numOfFunders);
        for (uint i = 1; i <= numOfFunders; i++) {
            allFunders[i - 1] = funders[i];
        }
        return allFunders;
    } 

    function getFunderAtIndex(uint index) external view returns (address) {
        require(index < numOfFunders, "Index out of bounds");
        return funders[index+1];
    }  
}
