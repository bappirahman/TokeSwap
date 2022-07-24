const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  // DEXToken
  const DEXToken = await hre.ethers.getContractFactory("DEXToken");
  const dEXToken = await DEXToken.deploy();

  await dEXToken.deployed();
  console.log("DEXToken deployed to:", dEXToken.address);
  // TokeSwap
  const TokeSwap = await hre.ethers.getContractFactory("TokeSwap");
  const tokeSwap = await TokeSwap.deploy(dEXToken.address);

  await tokeSwap.deployed();
  console.log("TokeSwap deployed to:", tokeSwap.address);
  const amount = BigInt(1000000 * 10 ** 18).toString();
  await dEXToken.transfer(tokeSwap.address, amount);
  dEXToken.setTokeSwapAddress(tokeSwap.address);
  console.log("Transaction Confirmed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
