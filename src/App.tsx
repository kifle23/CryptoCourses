import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";

interface Web3Api {
  provider: any;
  web3: Web3 | null;
}

function App() {
  const [web3Api, setWeb3Api] = useState<Web3Api>({
    provider: null,
    web3: null,
  });
  
  useEffect(() => {
    const loadProvider = async () => {
      let provider = null;
      if ((window as any).ethereum) {
        provider = (window as any).ethereum;
        try {
          await provider.request({ method: "eth_requestAccounts" });
        } catch (error) {
          console.error("User denied account access");
        }       
      } else if ((window as any).web3) {
        provider = (window as any).web3.currentProvider;
      } else if (process.env.NODE_ENV !== 'production') {
        provider = new Web3.providers.HttpProvider("http://localhost:7545");
      }
      
      if (provider) {
        setWeb3Api({
          provider,
          web3: new Web3(provider)
        });
      }
    };
    loadProvider();
  }, []);

  console.log("Web3api: ",web3Api.web3);

  return (
    <div className="faucet-wrapper">
      <div className="faucet">
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

