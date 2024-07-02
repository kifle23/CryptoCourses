import { formatEther } from "ethers";
import React, { useEffect, useState } from "react";
import Web3 from "web3";

interface AccountInfoProps {
  web3Api: {
    provider: any;
    web3: Web3 | null;
    address: string;
  };
  connectWallet: () => void;
  reload: boolean;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  web3Api,
  connectWallet,
  reload,
}) => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    const getAccountInfo = async () => {
      const { provider, web3, address } = web3Api;
      if (web3 && address) {
        try {
          const balanceWei = await provider.getBalance(address);
          const balanceEth = formatEther(balanceWei);
          setAccount(address);
          setBalance(balanceEth);
        } catch (error) {
          console.error("Error fetching account info:", error);
        }
      }
    };

    getAccountInfo();
  }, [web3Api, reload]);

  return (
    <>
      <div className="is-flex is-align-items-center">
        <span>
          <strong className="mr-2">Account:</strong>{" "}
        </span>
        {account ? (
          <span>{account}</span>
        ) : (
          <button className="button is-small" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
      <div className="balance-view is-size-2 my-4">
        Current Balance: <strong>{balance}</strong> ETH
      </div>
    </>
  );
};

export default AccountInfo;

