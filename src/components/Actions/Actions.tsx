import React, { useCallback } from "react";
import { parseEther } from "ethers";

interface ActionProps {
  web3Api: {
    provider: any;
    address: string;
  };
}

const Actions: React.FC<ActionProps> = ({ web3Api }) => {
  const addFunds =useCallback(async () => {
    const { provider, address } = web3Api;

    if (provider && address) {
      try {
        const signer = await provider.getSigner();
        const tx = await signer.sendTransaction({
          to: address,
          value: parseEther("1.0"),
        });

        await tx.wait();
        alert("Funds added to your account!");
      } catch (error) {
        console.error("Error adding funds:", error);
      }
    }
  }, [web3Api]);

  return (
    <>
      <button className="button mr-2 is-link" onClick={addFunds}>
        Donate 1eth
      </button>
      <button className="button is-primary">Withdraw</button>
    </>
  );
};

export default Actions;

