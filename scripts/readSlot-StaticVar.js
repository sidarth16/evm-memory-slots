// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// const ethers = hre.ethers
async function main() {

  const contractFactory = await hre.ethers.getContractFactory("StorageTestStaticVar");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  // a = await contract.a();
  // console.log("a : ", a);
  console.log("Slot 0 : ", await hre.ethers.provider.getStorageAt(contract.address, 0));
  console.log("Slot 1 : ", await hre.ethers.provider.getStorageAt(contract.address, 1));
  console.log("Slot 2 : ", await hre.ethers.provider.getStorageAt(contract.address, 2));
  console.log("Slot 3 : ", await hre.ethers.provider.getStorageAt(contract.address, 3));

  console.log("Deployed", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});