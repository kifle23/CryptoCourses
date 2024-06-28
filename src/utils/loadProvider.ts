import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

interface Web3Api {
  provider: any;
  web3: Web3 | null;
}

export const loadWeb3Provider = async (): Promise<Web3Api> => {
  const provider = await detectEthereumProvider();
  if (provider) {
    return { provider, web3: new Web3(provider as any) };
  } else {
    console.log("Please install MetaMask!");
    return { provider: null, web3: null };
  }
};
