import { ethers } from "ethers";

export const loadContract = async (name: string, signer: ethers.Signer) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();

  const provider = signer.provider;
  if (!provider) {
    throw new Error("Signer does not have an associated provider");
  }

  const contract = new ethers.Contract(Artifact.address, Artifact.abi, signer);

  return contract;
};
