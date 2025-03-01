const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("WTFApe", function () {
  let wtfApe, owner, addr1;

  beforeEach(async function () {
    // 部署WTFApe合約
    const WTFApe = await ethers.getContractFactory("WTFApe");
    wtfApe = await WTFApe.deploy("WTFApe", "WTF");

    // 獲取測試帳戶
    [owner, addr1] = await ethers.getSigners();
  });

  it("Should mint an NFT", async function () {
    // 鑄造NFT
    await wtfApe.mint(owner.address, 0);
    expect(await wtfApe.ownerOf(0)).to.equal(owner.address);
  });

  it("Should not mint an NFT with invalid tokenId", async function () {
    // 嘗試鑄造無效的tokenId
    await expect(wtfApe.mint(owner.address, 10000)).to.be.revertedWith(
      "tokenId out of range"
    );
  });

  it("Should have correct name and symbol", async function () {
    expect(await wtfApe.name()).to.equal("WTFApe");
    expect(await wtfApe.symbol()).to.equal("WTF");
  });

  it("Should not allow minting to zero address", async function () {
    await expect(wtfApe.mint(ethers.ZeroAddress, 0)).to.be.revertedWith(
      "mint to zero address"
    );
  });

  it("Should not allow double minting", async function () {
    await wtfApe.mint(owner.address, 0);
    await expect(wtfApe.mint(owner.address, 0)).to.be.revertedWith(
      "token already minted"
    );
  });

  it("Should allow transfer of NFT", async function () {
    // 鑄造NFT
    await wtfApe.mint(owner.address, 0);
    // 轉移NFT
    await wtfApe.transferFrom(owner.address, addr1.address, 0);
    // 確認NFT所有權已轉移
    expect(await wtfApe.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should not allow transfer of non-owned NFT", async function () {
    // 鑄造NFT
    await wtfApe.mint(owner.address, 0);
    // 嘗試轉移非擁有的NFT，應該失敗
    await expect(
      wtfApe.connect(addr1).transferFrom(owner.address, addr1.address, 0)
    ).to.be.revertedWith("transfer caller is not owner nor approved");
  });

  it("Should approve and transfer NFT", async function () {
    // 鑄造NFT
    await wtfApe.mint(owner.address, 0);
    // 授權NFT給addr1
    await wtfApe.approve(addr1.address, 0);
    // addr1轉移NFT
    await wtfApe.connect(addr1).transferFrom(owner.address, addr1.address, 0);
    // 確認NFT所有權已轉移
    expect(await wtfApe.ownerOf(0)).to.equal(addr1.address);
  });
});
