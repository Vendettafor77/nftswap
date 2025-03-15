async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const VenAPE = await ethers.getContractFactory("VenAPE");
  const venApe = await VenAPE.deploy("VENApe", "V");
  //   await venApe.deployed();
  console.log("VenAPE deployed to:", venApe.address);

  const NFTSwap = await ethers.getContractFactory("NFTSwap");
  const nftSwap = await NFTSwap.deploy();
  //   await nftSwap.deployed();
  console.log("NFTSwap deployed to:", nftSwap.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
