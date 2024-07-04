import Web3 from "web3";
import { ethers } from "ethers";
import { getNetworkName, getProvider, loadContract } from "./load-contract";

interface Web3Api {
  provider: any;
  isProviderLoaded: boolean;
  web3: Web3 | null;
  contract: ethers.Contract | null;
  address: string;
}

export const loadWeb3Provider = async (
  name: string,
  address: string,
  providerUrl: string
): Promise<Web3Api> => {
  try {
    const provider = getProvider();
    let signer = null;
    if (provider) {
      signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const networkName = getNetworkName(network);
      console.log("Provider loaded and connected to network:", networkName);
      if (networkName !== "ganache") {
        return {
          provider,
          isProviderLoaded: true,
          web3: null,
          contract: null,
          address: "",
        };
      }

      const contract = await loadContract(provider, name, address, signer);
      const web3 = new Web3(providerUrl);

      return { provider,isProviderLoaded: true, web3, contract, address };
    } else {
      return {
        provider: null,
        isProviderLoaded: true,
        web3: null,
        contract: null,
        address: "",
      };
    }
  } catch (error) {
    console.error("Failed to initialize Web3 provider:", error);
    return {
      provider: null,
      isProviderLoaded: true,
      web3: null,
      contract: null,
      address: "",
    };
  }
};

