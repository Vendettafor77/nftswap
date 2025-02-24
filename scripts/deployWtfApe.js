const hre = require("hardhat");

async function main() {
    const WTFApe = await hre.ethers.getContractFactory("WTFApe");
    const wtfApe = await WTFApe.deploy("WTFApe", "WTA");

    // デプロイが完了するまで待機
    await wtfApe.waitForDeployment();

    console.log(`WTFApe deployed to: ${await wtfApe.getAddress()}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});