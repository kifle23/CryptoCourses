import { ethers } from "ethers";

export const getProvider = (): ethers.BrowserProvider => {
  return new ethers.BrowserProvider(window.ethereum);
};

export const getNetworkName = (network: ethers.Network): string => {
  if (network.chainId === BigInt(1337)) {
    return "ganache";
  }
  return "unknown";
};

export const loadContract = async (
  provider: any,
  name: string,
  address: string,
  signer: ethers.Signer
): Promise<ethers.Contract | null> => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();

    if (address && artifact.abi && provider) {
      const contract = new ethers.Contract(address, artifact.abi, provider);
      return contract.connect(signer) as ethers.Contract;
    }
    return null;
  } catch (error) {
    console.error("Failed to load contract:", error);
    return null;
  }
};

