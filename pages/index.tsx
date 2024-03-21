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

const Home: NextPage = () => {
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
  const [proofsData, setProofsData] = useState<string[]>();
  const address = useAddress();

  async function fetchData() {
    try {
      console.log("fetching proofs for address:" + address);
      const response = await fetch("/tree.json");
      const treeData = await response.json();

      const tree = StandardMerkleTree.load(treeData);
      console.log("JSON loaded.");

      setMerkleRoot(tree.root);

      const proofs = [];
      console.log("loading proofs for:" + address);

      for (const [i, v] of tree.entries()) {
        if (v[0] === address) {
          const proof = tree.getProof(i);
          proofs.push(proof);
        }
      }
      setProofsData(proofs[0]);
    } catch (error) {
      console.log("we had an error, panic" + error);
    }
  }

  // useEffect(() => {
  //   if (address) {
  //     fetchData();
  //   }
  // }, [address]);

  console.log(proofsData);

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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        {address && (
          <div>
            <div
              style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                minWidth: "500px",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}
            >
              <h1>Create Merkle Tree</h1>
              <button
                onClick={() => fetchData()}
                style={{
                  padding: "1rem",
                  borderRadius: "8px",
                  backgroundColor: "#FFF",
                  color: "#333",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Generate
              </button>
              {merkleRoot && <p>Merkle Root Hash: {merkleRoot}</p>}
            </div>
            <div
              style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                minWidth: "500px",
              }}
            >
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
