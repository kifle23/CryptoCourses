// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Faucet {
    uint public numOfFunders;
    address public owner;

    mapping(address => bool) private funders;
    address[] private funderList;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier limitWithdraw(uint amount) {
        require(amount <= address(this).balance, "Insufficient balance");
        require(
            amount <= 0.1 ether,
            "To much amount requested:Can not withdraw more than 0.1 ether"
        );
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            numOfFunders++;
            funders[funder] = true;
            funderList.push(funder);
        }
    }

    function withdraw(uint amount) external limitWithdraw(amount) {
        payable(msg.sender).transfer(amount);
    }

    function getAllFunders() external view returns (address[] memory) {
        return funderList;
    }

    function getFunderAtIndex(uint index) external view returns (address) {
        require(index < numOfFunders, "Index out of bounds");
        return funderList[index];
    }
}
