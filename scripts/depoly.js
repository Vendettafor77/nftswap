async function main() {
  const NFTSwap = await ethers.getContractFactory("NFTSwap");
  const nftSwap = await NFTSwap.deploy();
//   await nftSwap.deployed();
  console.log("NFTSwap deployed to:", nftSwap.address);

  const WTFApe = await ethers.getContractFactory("WTFApe");
  const wtfApe = await WTFApe.deploy("VENApe", "V");
//   await wtfApe.deployed();
  console.log("WTFApe deployed to:", wtfApe.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
