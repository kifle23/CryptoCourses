import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Web3 from "web3";
import { loadWeb3Provider } from "./utils/loadProvider";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import Actions from "./components/Actions/Actions";

interface Web3Api {
  provider: any;
  isProviderLoaded: boolean;
  web3: Web3 | null;
  contract: ethers.Contract | null;
  address: string;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null,
    address: "",
  });
  const [reload, setReload] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");

  const setAccountListener = () => {
    if (window.ethereum && typeof window.ethereum.on === "function") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
      });
      window.ethereum.on("chainChanged", () => window.location.reload());
    }
  };

  useEffect(() => {
    const getAccount = async () => {
      if (!web3Api.web3) return;
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    };

    getAccount();
  }, [web3Api.web3]);

  useEffect(() => {
    const initializeWeb3 = async () => {
      const address = "0x9D286e80Ecd17561658c53EBae3c88f900Bdf204";
      const providerUrl = "http://127.0.0.1:7545";
      setAccountListener();
      const api = await loadWeb3Provider("Faucet", address, providerUrl);
      setWeb3Api(api);
    };

    initializeWeb3();
  }, [account]);

  const connectWallet = useCallback(async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      console.error("Ethereum provider not found");
    }
  }, []);

  const reloadAccountInfo = useCallback(() => setReload(!reload), [reload]);
  const canConnectToContract = !!account && !!web3Api.contract;

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        {web3Api.isProviderLoaded ? (
          <AccountInfo
            web3Api={web3Api}
            connectWallet={connectWallet}
            reload={reload}
            account={account}
          />
        ) : (
          <span></span>
        )}
        <div className="message-and-actions">
          {!canConnectToContract && (
            <i className="icon has-text-danger">Connect to Ganache</i>
          )}
        </div>
        <Actions
          web3Api={web3Api}
          reloadAccountInfo={reloadAccountInfo}
          account={account}
          canConnectToContract={canConnectToContract}
        />
      </div>
    </div>
  );
}

export default App;

