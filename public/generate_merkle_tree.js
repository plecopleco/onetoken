const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// (1)

const valuesPath = "values.json";

const readFile = (callback) => {
  fs.readFile(valuesPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error while reading the file:", err);
      return callback(err);
    }
    try {
      const myData = JSON.parse(data);
      callback(null, myData);
    } catch (err) {
      console.error("Error while parsing JSON data:", err);
      callback(err);
    }
  });
};

readFile((err, valuesData) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // (2) Create the merkle tree using the data
  const tree = StandardMerkleTree.of(valuesData, ["address", "uint256"]);

  // (3) Output the merkle root
  console.log("Merkle Root:", tree.root);

  // (4) Write the merkle tree to a JSON file
  fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));
});

// const values = [
//   ["0x9b272c668AD7FE9ec2C6d126823135e5BdF4Abbd", "100000000000000000000"],
//   ["0xCcAdA9f3464148E0ECb691B6bAE571F1DF6D6a29", "100000000000000000000"],
//   ["0x24B830b985C2B6EBaaC2770bE4f087B04C0b4B8D", "100000000000000000000"],
//   ["0xA9e271e8703A1324cfF74f8C4AC30E5D999677E8", "100000000000000000000"],
//   ["0x3eB542484dDd0D36a5D28Af86e0A50098E59233f", "100000000000000000000"],
//   ["0xf79db48B1Bd54e2D3e463ac7e0e4d447884bCA11", "100000000000000000000"],
//   ["0x6De66Dc027b4e2A453A6DC6c839b6Fc717761eD0", "100000000000000000000"],
//   ["0xce71Ee031cbcD6b363f0a428590ED7cd30d261bB", "100000000000000000000"],
//   ["0x4afd58c3D8Fb24cD3265EaAF21eFc201279ef971", "100000000000000000000"],
//   ["0x3E70513a38126B0EE7303e704fb06c8BC83F9A38", "100000000000000000000"],
//   ["0x230B6F463F8A60FA2a58b8FEc38f6760ebbE0184", "100000000000000000000"],
// ];
