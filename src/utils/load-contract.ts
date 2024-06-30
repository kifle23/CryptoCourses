import { JsonRpcProvider, ethers } from "ethers";

export const getProvider = (url: string): JsonRpcProvider => {
  return new JsonRpcProvider(url);
};

export const getNetworkName = (network: ethers.Network): string => {
  if (network.chainId === BigInt(1337)) {
    return "ganache";
  }
  return "unknown";
};

export const loadContract = async (provider: JsonRpcProvider, name: string, address: string): Promise<ethers.Contract | null> => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();

    if (address && artifact.abi) {
      return new ethers.Contract(address, artifact.abi, provider);
    }
    return null;
  } catch (error) {
    console.error("Failed to load contract:", error);
    return null;
  }
};
