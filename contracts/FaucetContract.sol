// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";

contract Faucet is Owned, Logger, IFaucet {
    uint public numOfFunders;

    mapping(address => bool) private funders;
    address[] private funderList;

    modifier limitWithdraw(uint amount) {
        require(amount <= address(this).balance, "Insufficient balance");
        require(
            amount <= 0.1 ether,
            "To much amount requested:Can not withdraw more than 0.1 ether"
        );
        _;
    }

    receive() external payable {}

    function emitLog() public pure override returns (bytes32) {
        return bytes32("Faucet");
    }

    function addFunds() external payable override {
        address funder = msg.sender;
        if (!funders[funder]) {
            numOfFunders++;
            funders[funder] = true;
            funderList.push(funder);
        }
    }

    function withdraw(uint amount) external override limitWithdraw(amount) {
        payable(msg.sender).transfer(amount);
    }

    function withdrawAll() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getAllFunders() external view returns (address[] memory) {
        return funderList;
    }

    function getFunderAtIndex(uint index) external view returns (address) {
        require(index < numOfFunders, "Index out of bounds");
        return funderList[index];
    }
}
