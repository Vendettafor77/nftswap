const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VenAPE", function () {
  let venApe, owner, addr1;

  beforeEach(async function () {
    // 部署VenAPE合約
    const VenAPE = await ethers.getContractFactory("VenAPE");
    venApe = await VenAPE.deploy("VenAPE", "VEN");

    // 獲取測試帳戶
    [owner, addr1] = await ethers.getSigners();
  });

  it("Should mint an NFT", async function () {
    // 鑄造NFT
    await venApe.mint(owner.address, 0);
    expect(await venApe.ownerOf(0)).to.equal(owner.address);
  });

  it("Should not mint NFT with tokenId out of range", async function () {
    // 嘗試鑄造超出範圍的NFT
    await expect(venApe.mint(owner.address, 10000)).to.be.revertedWith(
      "tokenId out of range"
    );
  });

  it("Should have correct name and symbol", async function () {
    // 檢查名稱和符號
    expect(await venApe.name()).to.equal("VenAPE");
    expect(await venApe.symbol()).to.equal("VEN");
  });

  it("Should not mint to zero address", async function () {
    // 嘗試鑄造到零地址
    await expect(venApe.mint(ethers.ZeroAddress, 0)).to.be.revertedWith(
      "ERC721: mint to the zero address"
    );
  });

  it("Should not mint duplicate tokenId", async function () {
    // 鑄造NFT
    await venApe.mint(owner.address, 0);
    // 嘗試再次鑄造相同的tokenId
    await expect(venApe.mint(owner.address, 0)).to.be.revertedWith(
      "ERC721: token already minted"
    );
  });

  it("Should transfer NFT", async function () {
    // 鑄造NFT
    await venApe.mint(owner.address, 0);
    // 轉移NFT
    await venApe.transferFrom(owner.address, addr1.address, 0);
    // 檢查新的擁有者
    expect(await venApe.ownerOf(0)).to.equal(addr1.address);
  });

  it("Should not transfer NFT without permission", async function () {
    // 鑄造NFT
    await venApe.mint(owner.address, 0);
    // 嘗試未經授權轉移NFT
    await expect(
      venApe.connect(addr1).transferFrom(owner.address, addr1.address, 0)
    ).to.be.revertedWith("ERC721: caller is not token owner or approved");
  });

  it("Should transfer NFT with approval", async function () {
    // 鑄造NFT
    await venApe.mint(owner.address, 0);
    // 授權addr1轉移NFT
    await venApe.approve(addr1.address, 0);
    // addr1轉移NFT
    await venApe.connect(addr1).transferFrom(owner.address, addr1.address, 0);
    // 檢查新的擁有者
    expect(await venApe.ownerOf(0)).to.equal(addr1.address);
  });
});
