import React from "react";
import { ethers, parseEther } from "ethers";

interface ActionProps {
  web3Api: {
    address: string;
    contract: ethers.Contract | null;
  };
  reloadAccountInfo: () => void;
  account: string;
  canConnectToContract: boolean;
}

const Actions: React.FC<ActionProps> = ({
  web3Api,
  reloadAccountInfo,
  account,
  canConnectToContract,
}) => {
  const addFunds = async () => {
    const { contract } = web3Api;

    if (account && contract) {
      try {
        const tx = await contract.addFunds({
          from: account,
          value: parseEther("0.1"),
        });
        await tx.wait();
        reloadAccountInfo();
      } catch (error) {
        console.error("Error adding funds:", error);
      }
    }
  };

  const withdraw = async () => {
    const { contract, address } = web3Api;

    if (account && address && contract) {
      try {
        const tx = await contract.withdraw(parseEther("0.1"));
        await tx.wait();
        reloadAccountInfo();
      } catch (error) {
        console.error("Error withdrawing funds:", error);
      }
    }
  };

  return (
    <>
      <button
        disabled={!canConnectToContract}
        className="button mr-2 is-link"
        onClick={addFunds}
      >
        Donate 0.1eth
      </button>
      <button
        disabled={!canConnectToContract}
        className="button is-primary"
        onClick={withdraw}
      >
        Withdraw 0.1eth
      </button>
    </>
  );
};

export default Actions;

