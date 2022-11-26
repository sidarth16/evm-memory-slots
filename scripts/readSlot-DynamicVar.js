// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
// const ethers = hre.ethers
async function main() {

  const contractFactory = await hre.ethers.getContractFactory("StorageTestDynamicVar");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  console.log("Deployed", contract.address);

  // a = await contract.a();
  // console.log("a : ", a);
  console.log("Slot 0\t a : ", await hre.ethers.provider.getStorageAt(contract.address, 0));
  console.log("Slot 1\t b[0] : ", await hre.ethers.provider.getStorageAt(contract.address, 1));
  console.log("Slot 2\t b[1] : ", await hre.ethers.provider.getStorageAt(contract.address, 2));
  console.log("Slot 3\t b[2] : ", await hre.ethers.provider.getStorageAt(contract.address, 3));
  console.log("Slot 4\t c.id : ", await hre.ethers.provider.getStorageAt(contract.address, 4));
  console.log("Slot 5\t c.value : ", await hre.ethers.provider.getStorageAt(contract.address, 5));
  
  console.log("Slot 6\t d.length : ", await hre.ethers.provider.getStorageAt(contract.address, 6));
  slotOfd = 6; //ethers.utils.keccak256()
  
  d0SlotId =  hre.ethers.utils.solidityKeccak256(["uint256"], ["6"] )
  console.log(`  d[0]:  SlotId ( ${d0SlotId} ) : ${await hre.ethers.provider.getStorageAt(contract.address, d0SlotId)}`);

  d1SlotId = hre.ethers.BigNumber.from(d0SlotId).add(1).toHexString()
  console.log(`  d[1]:  SlotId ( ${d1SlotId} ) : ${await hre.ethers.provider.getStorageAt(contract.address, d1SlotId)}`);

  d2SlotId = hre.ethers.BigNumber.from(d0SlotId).add(2).toHexString()
  console.log(` d[2]:  SlotId ( ${d2SlotId} ) : ${await hre.ethers.provider.getStorageAt(contract.address, d2SlotId)}`);

  console.log("Slot 7\t e.length : ", await hre.ethers.provider.getStorageAt(contract.address, 7));
  
  e0SlotId =  hre.ethers.utils.solidityKeccak256(["uint256"], ["7"] )
  console.log(` e[0].id: SlotId (${e0SlotId}) : ${await hre.ethers.provider.getStorageAt(contract.address, e0SlotId)}`);

  e1SlotId = hre.ethers.BigNumber.from(e0SlotId).add(1).toHexString()
  console.log(` e[0].value: SlotId (${e0SlotId}) : ${await hre.ethers.provider.getStorageAt(contract.address, e1SlotId)}`);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});