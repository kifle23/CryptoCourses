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
  const [account, setAccount] = useState<string>();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    const initializeWeb3 = async () => {
      const api = await loadWeb3Provider();
      setWeb3Api(api);
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const getAccounts = async () => {
      if (web3Api.web3) {
        const accounts = await web3Api.web3.eth.getAccounts();
        setAccount(accounts[0]);
        const balance = await web3Api.web3.eth.getBalance(accounts[0]);
        setBalance(web3Api.web3.utils.fromWei(balance, "ether"));
      }
    };

    if (web3Api.web3) {
      getAccounts();
    }
  }, [web3Api.web3]);

  useEffect(() => {
    const loadProvider = async () => {
      if (!window.ethereum) {
        console.log("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const contract = await loadContract("Faucet", signer);
        setContract(contract);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    };

    loadProvider();
  }, []);

  const connectWallet = async () => {
    if (web3Api.provider) {
      await web3Api.provider.request({ method: "eth_requestAccounts" });
    }
  };

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <AccountInfo
          account={account}
          balance={balance}
          connectWallet={connectWallet}
        />
        <Actions />
      </div>
    </div>
  );
}

export default App;

