const { StandardMerkleTree } = require("@openzeppelin/merkle-tree");
const fs = require("fs");

// (1)
console.log("Started 123")
const tree = StandardMerkleTree.load(JSON.parse(fs.readFileSync("tree.json", "utf8")));
const hash = tree.root;
console.log(tree.root);


// (2)
for (const [i, v] of tree.entries()) {
  if (v[0] === '0xCcAdA9f3464148E0ECb691B6bAE571F1DF6D6a29') {
    // (3)
    const proof = tree.getProof(i);
    console.log('Value:', v);
    console.log('Proof:', proof);
  }
}

