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
        try {
          await (provider as any).request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User denied account access");
        }
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
        <span>
          <strong>Connected Account:</strong>{" "}
          {account ? account : "No account connected"}
        </span>
        <div className="balance-view is-size-2">
          Current Balance: <strong>10</strong>ETH
        </div>

        <button className="button mr-2">Donate</button>
        <button className="button">Withdraw</button>
      </div>
    </div>
  );
}

export default App;

