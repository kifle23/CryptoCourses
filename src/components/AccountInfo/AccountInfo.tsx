import React, { useEffect, useState } from "react";
import Web3 from "web3";

interface AccountInfoProps {
  web3Api: {
    provider: any;
    web3: Web3 | null;
  };
  connectWallet: () => void;
}

const AccountInfo: React.FC<AccountInfoProps> = ({
  web3Api,
  connectWallet,
}) => {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    const getAccountInfo = async () => {
      try {
        if (web3Api.web3) {
          const address = "0x9D286e80Ecd17561658c53EBae3c88f900Bdf204";
          const balance = await web3Api.web3.eth.getBalance(address);
          setAccount(address);
          setBalance(web3Api.web3.utils.fromWei(balance, "ether"));
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    getAccountInfo();
  }, [web3Api.web3]);

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

