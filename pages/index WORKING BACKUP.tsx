import { ConnectWallet, Web3Button, useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";


const Home: NextPage = () => {
  const [merkleRoot, setMerkleRoot] = useState<string | null>(null);
  const address = useAddress(); 

    async function fetchData(address: string) {
      try {
          console.log("fetching proofs for address:" + address)
          const response = await fetch('/tree.json'); // Fetch tree.json from the public folder
          const treeData = await response.json(); // Parse response as JSON

          
          // console.log(treeData);
          
          const tree = StandardMerkleTree.load(treeData);
          console.log(tree.root);
          console.log("JSON loaded.")
          
          const proofs = [];
          console.log("loading proofs for:" + address);
          for (const [i, v] of tree.entries()) {
            console.log(i);
            console.log(v);

            //console.log(tree.entries());
              if (v[0] === address) {
                  const proof = tree.getProof(i);
                  
                  proofs.push(proof);
                  
              }
              
          
          }
          console.log([proofs]);
          return proofs;
          

      } catch (error) {
          console.log("we had an error, panic" + error)}
  }

  useEffect(() => {
    // Only proceed if address is available
    if (address) {
      fetchData(address);
    }
  }, [address]);


    
    fetchData(address);




  const { contract: tokenContract } = useContract("0xF5bCF3C61b688616302b14BE21eED9E7B44ab388");
  const { data: tokenBalance } = useTokenBalance(tokenContract, address);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ConnectWallet />
        {address && (
          <div>
            <div style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                minWidth: "500px",
                marginBottom: "2rem",
                marginTop: "2rem",
              }}>
                <h1>Create Merkle Tree</h1>
                <button
                  onClick={() => console.log(fetchData(address))}
                  style={{
                    padding: "1rem",
                    borderRadius: "8px",
                    backgroundColor: "#FFF",
                    color: "#333",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >Generate</button>
                {merkleRoot && (
                  <p>Merkle Root Hash: {merkleRoot}</p>
                )}
              </div>
              <div style={{
                backgroundColor: "#222",
                padding: "2rem",
                borderRadius: "1rem",
                textAlign: "center",
                minWidth: "500px",
              }}>
                <h1>$COQWIF Airdrop</h1>
                <h3>Token balance: {tokenBalance?.displayValue}</h3>
                <Web3Button
                  contractAddress="0x8b51B8CAf0d9962Bc6Da46113CAeb5adD2f141E2"
                  action={async (contract) => contract.call(
                    "claimAirdrop", 
                    [
                    await fetchData(address),
                      100000000000000000000,
                    ]
                  )}
                  onError={() => alert("Not eligible for airdrop or already claimed!")}
                  onSuccess={() => alert("Airdrop claimed!")}
                >Claim Airdrop</Web3Button>
              </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;