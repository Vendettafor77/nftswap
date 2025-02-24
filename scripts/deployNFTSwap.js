const hre = require("hardhat");

async function main() {
    const NFTSwap = await hre.ethers.getContractFactory("NFTSwap");
    const nftSwap = await NFTSwap.deploy();

    // コントラクトアドレスの取得方法を修正
    console.log(`NFTSwap deployed to: ${await nftSwap.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});