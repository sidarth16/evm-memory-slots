// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = hre.ethers

function hex_to_ascii(a)
{
    var hex  = a.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}


async function main() {

  const contractFactory = await hre.ethers.getContractFactory("StorageTestBytesStrings");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Deployed", contract.address);

  slotId = 0
  console.log(`a: Slot ${slotId} : ${await hre.ethers.provider.getStorageAt(contract.address, slotId)}`);

  slotId = 1
  console.log(`b: Slot ${slotId} : ${await hre.ethers.provider.getStorageAt(contract.address, slotId)}`);

  slotId = 2
  slotValue = await hre.ethers.provider.getStorageAt(contract.address, slotId)
  console.log(`c: Slot ${slotId} : ${slotValue}`);

  numOfSlots = ~~(( hre.ethers.BigNumber.from(slotValue) )/32  )
  BaseSlotId = hre.ethers.utils.solidityKeccak256(["uint256"], [slotId] )
  console.log("numOfSlots : ", numOfSlots );
  for (i=0; i<numOfSlots; i++){
    slotId = hre.ethers.BigNumber.from(BaseSlotId).add(i).toHexString()
    slotValue = await hre.ethers.provider.getStorageAt(contract.address, slotId)
    console.log(`c: Slot ${slotId} : ${hex_to_ascii(slotValue)}`); 
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});