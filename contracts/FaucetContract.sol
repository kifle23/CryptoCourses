// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Faucet {
    uint public numOfFunders;
    mapping(address => bool) private funders;
    address[] private funderList;

    receive() external payable {}

    function addFunds() external payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            numOfFunders++;
            funders[funder] = true;
            funderList.push(funder);
        }
    }

    function withdraw(uint amount) external {
        require(amount <= address(this).balance, "Insufficient balance");
        require(
            amount <= 0.1 ether,
            "To much amount requested:Can not withdraw more than 0.1 ether"
        );
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