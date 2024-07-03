import Web3 from "web3";
import { JsonRpcProvider, ethers } from "ethers";
import { getProvider, getNetworkName, loadContract } from "./load-contract";

interface Web3Api {
  provider: JsonRpcProvider;
  web3: Web3 | null;
  contract: ethers.Contract | null;
  address: string;
}

export const loadWeb3Provider = async (
  name: string,
  address: string,
  providerUrl: string,
  account: string
): Promise<Web3Api> => {
  const provider = getProvider(providerUrl);

  try {
    const network = await provider.getNetwork();
    const networkName = getNetworkName(network);
    console.log("Provider loaded and connected to network:", networkName);

    const signer = await provider.getSigner();
    const contract = await loadContract(provider, name, address, signer);
    const web3 = new Web3(providerUrl);

    return { provider, web3, contract, address };
  } catch (error) {
    console.error("Failed to initialize Web3 provider:", error);
    return {
      provider,
      web3: null,
      contract: null,
      address: "",
    };
  }
};

