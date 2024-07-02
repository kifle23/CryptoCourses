import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";
import Web3 from "web3";
import { loadWeb3Provider } from "./utils/loadProvider";
import AccountInfo from "./components/AccountInfo/AccountInfo";
import Actions from "./components/Actions/Actions";

interface Web3Api {
  provider: any;
  web3: Web3 | null;
  contract: ethers.Contract | null;
  address: string;
  providerUrl: string;
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
    contract: null,
    address: "",
    providerUrl: "",
  });
  const [reload, setReload] = useState<boolean>(false);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    const initializeWeb3 = async () => {
      const address = "0x9D286e80Ecd17561658c53EBae3c88f900Bdf204";
      const providerUrl = "http://127.0.0.1:7545";
      const api = await loadWeb3Provider("Faucet", address, providerUrl);
      setWeb3Api(api);
    };

    initializeWeb3();
  }, []);

  useEffect(() => {
    const getAccount = async () => {
      if (!web3Api.web3) return;
      const accounts = await web3Api.web3.eth.getAccounts();
      setAccount(accounts[0]);
    };

    getAccount();
  }, [web3Api.web3]);

  const connectWallet = useCallback(async () => {
    if (web3Api.provider) {
      await web3Api.provider.request({ method: "eth_requestAccounts" });
    }
  }, [web3Api.provider]);

  const reloadAccountInfo = useCallback(() => {
    setReload((prevReload) => !prevReload);
  }, []);

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
        <AccountInfo
          web3Api={web3Api}
          connectWallet={connectWallet}
          reload={reload}
        />
        <Actions
          web3Api={web3Api}
          reloadAccountInfo={reloadAccountInfo}
          account={account}
        />
      </div>
    </div>
  );
}

export default App;

