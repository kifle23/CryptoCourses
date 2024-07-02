import React from "react";
import { ethers, parseEther } from "ethers";

interface ActionProps {
  web3Api: {
    provider: any;
    contract: ethers.Contract | null;
  };
  reloadAccountInfo: () => void;
  account: string;
}

const Actions: React.FC<ActionProps> = ({
  web3Api,
  reloadAccountInfo,
  account,
}) => {
  const addFunds = async () => {
    const { contract } = web3Api;

    if (account && contract) {
      try {
        await contract.addFunds({
          from: account,
          value: parseEther("0.1"),
        });
        alert("Funds added to your account!");
        reloadAccountInfo();
      } catch (error) {
        console.error("Error adding funds:", error);
      }
    }
  };

  return (
    <>
      <button className="button mr-2 is-link" onClick={addFunds}>
        Donate 0.1eth
      </button>
      <button className="button is-primary">Withdraw</button>
    </>
  );
};

export default Actions;

