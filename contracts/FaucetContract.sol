// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Faucet {

    address[] public funders;

    receive() external payable {}
    
    function addFunds() external payable {
        funders.push(msg.sender);
    }

    function getAllFunders() external view returns (address[] memory) {
        return funders;
    }   
}
