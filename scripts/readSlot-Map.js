// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const ethers = hre.ethers

async function getMapping(contractAddress, mapKey, MapSlotId){
  slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKey,MapSlotId] );
  slotValue = await hre.ethers.provider.getStorageAt(contractAddress, slotId);
  console.log(`c[${mapKey}]: SlotId (${slotId}) : ${slotValue}`);
  return (slotId, slotValue );
}

async function getMappingOnlyVal(contractAddress, mapKey, MapSlotId){
  slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKey,MapSlotId] );
  slotValue = await hre.ethers.provider.getStorageAt(contractAddress, slotId);
  // console.log(`c[${mapKey}]: SlotId (${slotId}) : ${slotValue}`);
  return (slotId, slotValue );
}

async function getMappingFromKeys(contractAddress, mapKeys, mapKeyTypes, MapSlotId){
  let slotId = MapSlotId;
  let finalVal = 0;
  for (i=0; i<mapKeys.length; i++){
    slotId = hre.ethers.utils.solidityKeccak256([mapKeyTypes[i],"uint256"], [mapKeys[i],slotId] );
    finalVal = await hre.ethers.provider.getStorageAt(contractAddress, slotId);
    // console.log(`c[${mapKeys[i]}]: SlotId (${slotId}) : ${finalVal}`);
  }
  // console.log(`mapKeys[${mapKeys}] : `, slotValue);
  finalVal = hre.ethers.utils.defaultAbiCoder.decode([mapKeyTypes[-1]], finalVal)[0].toString()
  return [slotId, finalVal] ;
}

// // Mapping: uint256 => (uint256 => bool) 
// // mapKeys = [ "2", "3" ]
// // mapKeyTypes = ["uint256", "uint256", "bool"]
// async getMappingFromKeys(mapKeys:Array<string>, mapKeyTypes:Array<string>, MapSlotId:string){
//   let slotId = MapSlotId;
//   let finalVal = '0';
//   for (let i=0; i<mapKeys.length; i++){
//     slotId = ethers.utils.solidityKeccak256([mapKeyTypes[i],"uint256"], [mapKeys[i],slotId] );
//   }      
//   finalVal = await this.readVariable(slotId, mapKeyTypes[-1]);
//   return [slotId, finalVal] ;
// }

async function mainOld() {

  const contractFactory = await hre.ethers.getContractFactory("StorageTestMap");
  const contract = await contractFactory.deploy();
  await contract.deployed();


  // Mapping c
  const MapSlotId = 3
  
  mapKey = 2
  slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKey,MapSlotId] )
  console.log(`c[${mapKey}]: SlotId (${slotId}) : ${await hre.ethers.provider.getStorageAt(contract.address, slotId)}`);

  mapKey = 7
  slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKey,MapSlotId] )
  console.log(`c[${mapKey}]: SlotId (${slotId}) : ${await hre.ethers.provider.getStorageAt(contract.address, slotId)}`);

  mapKey = 100
  slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKey,MapSlotId] )
  console.log(`c[${mapKey}]: SlotId (${slotId}) : ${await hre.ethers.provider.getStorageAt(contract.address, slotId)}`);

  // Mapping d
  console.log("");
  initSlotId = 4
  
  mapKeys = [0,7];
  slotId = initSlotId;
  finalVal = 0;
  for (i=0; i<mapKeys.length; i++){
    slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKeys[i],slotId] );
    finalVal = await hre.ethers.provider.getStorageAt(contract.address, slotId);
    console.log(`d[${mapKeys[i]}]: SlotId (${slotId}) : ${finalVal}`);
  }
  console.log(`d[${mapKeys}]: ${finalVal}\n`);

  mapKeys = [1,6];
  slotId = initSlotId;
  finalVal = 0;
  for (i=0; i<mapKeys.length; i++){
    slotId = hre.ethers.utils.solidityKeccak256(["uint256","uint256"], [mapKeys[i],slotId] );
    finalVal = await hre.ethers.provider.getStorageAt(contract.address, slotId);
    console.log(`d[${mapKeys[i]}]: SlotId (${slotId}) : ${finalVal}`);
  }
  console.log(`d[${mapKeys}]: ${finalVal}`);
}

async function main() {

  const contractFactory = await hre.ethers.getContractFactory("StorageTestMap");
  const contract = await contractFactory.deploy();
  await contract.deployed();

  let MapSlotId = 0
  let slotId = 0
  let slotValue = 0
  let mapKeys = [0]
  let mapKeyTypes = ["uint256"]

  // Mapping c
  MapSlotId = 3
  
  mapKeys=["2"]; mapKeyTypes=["uint256"];
  [slotId, slotValue] = await getMappingFromKeys(contract.address, mapKeys, mapKeyTypes, MapSlotId);
  console.log(`c[${mapKeys}]: SlotId (${slotId}) : ${slotValue}`);

  mapKeys=["7"]; mapKeyTypes=["uint256"];
  [slotId, slotValue] = await getMappingFromKeys(contract.address, mapKeys, mapKeyTypes, MapSlotId);
  console.log(`c[${mapKeys}]: SlotId (${slotId}) : ${slotValue}`);

  mapKeys=["100"]; mapKeyTypes=["uint256"];
  [slotId, slotValue] = await getMappingFromKeys(contract.address, mapKeys, mapKeyTypes, MapSlotId);
  console.log(`c[${mapKeys}]: SlotId (${slotId}) : ${slotValue}`);

  console.log("");
  

  // Mapping d
  MapSlotId = 4
  
  // d[0][7] 
  mapKeys = ["0","7"];   mapKeyTypes=["uint256", "uint256"];
  [slotId, slotValue] = await getMappingFromKeys(contract.address, mapKeys, mapKeyTypes, MapSlotId)
  console.log(`d[${mapKeys}]: SlotId (${slotId}) : ${slotValue}`);

  // d[1][6] 
  mapKeys = ["1","6"];  mapKeyTypes=["uint256", "uint256"];
  [slotId, slotValue] = await getMappingFromKeys(contract.address, mapKeys, mapKeyTypes, MapSlotId)
  console.log(`d[${mapKeys}]: SlotId (${slotId}) : ${slotValue}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});