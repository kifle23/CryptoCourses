import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

interface Web3Api {
  provider: any;
  web3: Web3 | null;
}

function App() {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
  });
  const [account, setAccount] = useState<string>();

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {
        setWeb3Api({
          provider,
          web3: new Web3(provider as any),
        });
      } else {
        console.log("Please install MetaMask!");
      }
    };
    loadProvider();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      if (web3Api.web3) {
        const accounts = await web3Api.web3.eth.getAccounts();
        setAccount(accounts[0]);
      }
    };
    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <div className="is-flex is-align-items-center">
          <span>
            <strong className="mr-2">Account:</strong>{" "}
          </span>
          {account ? (
            <span>{account}</span>
          ) : (
            <button
              className="button is-samll"
              onClick={() =>
                web3Api.provider.request({ method: "eth_requestAccounts" })
              }
            >
              Connect Wallet
            </button>
          )}
        </div>
        <div className="balance-view is-size-2 my-4">
          Current Balance: <strong>10</strong>ETH
        </div>

        <button className="button mr-2 is-link">Donate</button>
        <button className="button is-primary">Withdraw</button>
      </div>
    </div>
  );
}

export default App;

