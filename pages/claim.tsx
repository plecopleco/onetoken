import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useTokenBalance,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { BigNumber, utils } from "ethers";
import localFont from "next/font/local";

const myFont = localFont({ src: "../pages/LuloCleanOne.otf" });
const myFontBold = localFont({ src: "../pages/LuloCleanOneBold.otf" });
const myTitleFont = localFont({ src: "../pages/SF-Pro-Display-Bold.otf" });

const Home: NextPage = () => {
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
  const [proofsData, setProofsData] = useState<string[]>();
  const address = useAddress();

  async function fetchData() {
    try {
      // console.log("fetching proofs for address:" + address);
      const response = await fetch("/tree.json");
      const treeData = await response.json();

      const tree = StandardMerkleTree.load(treeData);
      // console.log("JSON loaded.");

      setMerkleRoot(tree.root);

      const proofs = [];
      // console.log("loading proofs for:" + address);

      for (const [i, v] of tree.entries()) {
        if (v[0] === address) {
          const proof = tree.getProof(i);
          proofs.push(proof);
        }
      }
      setProofsData(proofs[0]);
    } catch (error) {
      // console.log("we had an error, panic" + error);
    }
  }

  // THIS IS THE TOKEN ADDRESS
  const { contract: tokenContract } = useContract(
    "0xF5bCF3C61b688616302b14BE21eED9E7B44ab388"
  );
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  // Make interaction based on price amount
  const [tokenBlc, setTokenBlc] = useState<any>();

  useEffect(() => {
    if (tokenBalance) {
      setTokenBlc(Number(tokenBalance.displayValue).toFixed(3));
    }
  }, [tokenBalance]);

  if (!address) {
    return (
      <div>
        <div className={myFontBold.className}>
          <div className="flex justify-center pb-5 flex-col items-center gap-5 ">
            <div className="flex flex-col items-center">
              <h1 className="md:text-4xl lg:text-7xl text-3xl">ONE TOKEN</h1>
            </div>
            <div className={myFont.className}>
              <h1>You can always try to get one</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col pt-4">
          <h1 className="pb-4">CLAIM YOUR AIRDROP</h1>
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="flex justify-center items-center flex-col h-screen">
        {address && (
          <div>
            <div>
              <h1>Create Merkle Tree</h1>
              <button onClick={() => fetchData()}>Generate</button>
              {merkleRoot && <p>Merkle Root Hash: {merkleRoot}</p>}
            </div>
            <div>
              <h1>$COQWIF Airdrop</h1>
              <h3>Token balance: {tokenBlc}</h3>
              <Web3Button
                contractAddress="0xABE251E6816d885B6C001543e28f4303B8e255d3"
                action={async (contract) =>
                  contract.call("claimAirdrop", [
                    proofsData, // Use proofsData here
                    "100000000000000000000",
                  ])
                }
                onError={() =>
                  alert("Not eligible for airdrop or already claimed!")
                }
                onSuccess={() => alert("Airdrop claimed!")}
              >
                Claim Airdrop
              </Web3Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
