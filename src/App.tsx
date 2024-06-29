import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Web3 from "web3";
import { loadContract } from "./utils/load-contract";
import { loadWeb3Provider } from "./utils/loadProvider";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import Actions from "./components/Actions/Actions";

interface Web3Api {
  provider: any;
  web3: Web3 | null;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
  });
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      const api = await loadWeb3Provider();
      setWeb3Api(api);
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        if (web3Api.web3) {
          if (window.ethereum) {
            const accounts = await web3Api.web3.eth.getAccounts();
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const contract = await loadContract("Faucet", signer, accounts[0]);
            setContract(contract);
          } else {
            console.log("Please install MetaMask!");
          }
        }
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    fetchContract();
  }, [web3Api.web3]);

  const connectWallet = async () => {
    if (web3Api.provider) {
      await web3Api.provider.request({ method: "eth_requestAccounts" });
    }
  };

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <AccountInfo web3Api={web3Api} connectWallet={connectWallet} />
        <Actions />
      </div>
    </div>
  );
}

export default App;

