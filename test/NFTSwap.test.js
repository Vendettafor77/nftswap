const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTSwap", function () {
  let nftSwap, venApe, mockNft, owner, addr1, addr2;

  beforeEach(async function () {
    // 部署VenAPE合約
    const VenAPE = await ethers.getContractFactory("VenAPE");
    venApe = await VenAPE.deploy("VenAPE", "VEN");
    await venApe.waitForDeployment(); // 確認合約部署成功
    console.log("VenAPE address:", venApe.target); // 打印合約地址以檢查是否為 null

    // 部署NFTSwap合約
    const NFTSwap = await ethers.getContractFactory("NFTSwap");
    nftSwap = await NFTSwap.deploy();
    await nftSwap.waitForDeployment(); // 確認合約部署成功
    console.log("NFTSwap address:", nftSwap.target); // 打印合約地址以檢查是否為 null

    // 部署 MockFailingNFT 合約（用於測試失敗場景）
    const MockNFT = await ethers.getContractFactory("MockFailingNFT");
    mockNft = await MockNFT.deploy();
    await mockNft.waitForDeployment();

    // 獲取測試帳戶
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  // 基本功能测试
  describe("Basic functions", function () {
    // 在每个测试前准备 NFT
    beforeEach(async function () {
      await venApe.mint(owner.address, 1);
      await venApe.approve(nftSwap.target, 1);
    });

    /**
     * 測試基本掛單功能
     * 確保 NFT 可以正確上架，並記錄正確的所有者和價格
     */
    it("Should list an NFT", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));
      const order = await nftSwap.nftList(venApe.target, 1);
      expect(order.owner).to.equal(owner.address);
      expect(order.price).to.equal(ethers.parseEther("1"));
    });

    /**
     * 測試基本購買功能
     * 確保買家可以用正確的價格購買 NFT，並成功轉移所有權
     */
    it("Should purchase an NFT", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 購買NFT
      await nftSwap
        .connect(addr1)
        .purchase(venApe.target, 1, { value: ethers.parseEther("1") });
      expect(await venApe.ownerOf(1)).to.equal(addr1.address);
    });

    it("Should revoke a listed NFT", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 撤銷掛單
      await nftSwap.revoke(venApe.target, 1);
      const order = await nftSwap.nftList(venApe.target, 1);
      expect(order.owner).to.equal(ethers.ZeroAddress);
    });

    it("Should update the price of a listed NFT", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 更新價格
      await nftSwap.update(venApe.target, 1, ethers.parseEther("2"));
      const order = await nftSwap.nftList(venApe.target, 1);
      expect(order.price).to.equal(ethers.parseEther("2"));
    });

    /**
     * 測試重複掛單情況
     * 期望錯誤: "NFT already listed"
     * 原因: 合約中 require(_order.owner == address(0) && _order.price == 0, "NFT already listed")
     */
    it("Should not allow double listing", async function () {
      // 第一次上架
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 铸造新的 NFT 并授权
      await venApe.mint(owner.address, 2);
      await venApe.approve(nftSwap.target, 2);

      // 尝试上架已经在列表中的 NFT (tokenId = 1)
      await expect(
        nftSwap.list(venApe.target, 1, ethers.parseEther("1"))
      ).to.be.revertedWith("Not token owner");

      // 验证新的 NFT 可以成功上架
      await nftSwap.list(venApe.target, 2, ethers.parseEther("1"));
    });

    /**
     * 測試重複購買情況
     * 期望錯誤: "Invalid Price"
     * 原因: 合約中 require(_order.price > 0, "Invalid Price")
     */
    it("Should not allow double purchase", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 購買NFT
      await nftSwap
        .connect(addr1)
        .purchase(venApe.target, 1, { value: ethers.parseEther("1") });

      // 嘗試再次購買相同的NFT，應該失敗
      await expect(
        nftSwap
          .connect(addr2)
          .purchase(venApe.target, 1, { value: ethers.parseEther("1") })
      ).to.be.revertedWith("Invalid Price");
    });

    /**
     * 測試重複撤銷情況
     * 期望錯誤: "Not Owner"
     * 原因: 合約中 require(_order.owner == msg.sender, "Not Owner")
     */
    it("Should not allow double revoke", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 撤銷掛單
      await nftSwap.revoke(venApe.target, 1);

      // 嘗試再次撤銷相同的NFT，應該失敗
      await expect(nftSwap.revoke(venApe.target, 1)).to.be.revertedWith(
        "Not Owner"
      );
    });

    it("Should list NFT with updated price", async function () {
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));

      // 更新價格
      await nftSwap.update(venApe.target, 1, ethers.parseEther("2"));

      // 確認NFT價格已成功更新
      const order = await nftSwap.nftList(venApe.target, 1);
      expect(order.price).to.equal(ethers.parseEther("2"));
    });
  });

  // 错误处理测试
  describe("Error handling", function () {
    beforeEach(async function () {
      await venApe.mint(owner.address, 1);
    });

    it("Should not allow listing with zero address", async function () {
      await venApe.approve(nftSwap.target, 1);
      await expect(
        nftSwap.list(ethers.ZeroAddress, 1, ethers.parseEther("1"))
      ).to.be.revertedWith("Invalid NFT address");
    });

    it("Should not allow listing with zero price", async function () {
      await venApe.approve(nftSwap.target, 1);
      await expect(nftSwap.list(venApe.target, 1, 0)).to.be.revertedWith(
        "Price must be greater than 0"
      );
    });

    it("Should not allow listing by non-owner", async function () {
      await venApe.approve(nftSwap.target, 1);
      await expect(
        nftSwap.connect(addr1).list(venApe.target, 1, ethers.parseEther("1"))
      ).to.be.revertedWith("Not token owner");
    });

    it("Should not allow listing without approval", async function () {
      await expect(
        nftSwap.list(venApe.target, 1, ethers.parseEther("1"))
      ).to.be.revertedWith("Need Approval");
    });

    /**
     * 測試 NFT 轉移失敗情況
     * 期望錯誤: "NFT transfer failed"
     */
    it("Should handle failed NFT transfer", async function () {
      await mockNft.mint(owner.address, 1);
      await mockNft.approve(nftSwap.target, 1);
      await expect(
        nftSwap.list(mockNft.target, 1, ethers.parseEther("1"))
      ).to.be.revertedWith("NFT transfer failed");
    });
  });

  // ETH 处理测试
  describe("ETH handling", function () {
    beforeEach(async function () {
      await venApe.mint(owner.address, 1);
      await venApe.approve(nftSwap.target, 1);
      await nftSwap.list(venApe.target, 1, ethers.parseEther("1"));
    });

    /**
     * 測試 ETH 退款機制
     * 1. 檢查買家支付的總金額（實際價格 + gas）
     * 2. 確保多餘的 ETH 被退回
     * 3. 驗證賣家收到正確的金額
     * 4. 確認 NFT 所有權轉移
     */
    it("Should refund excess ETH when purchasing", async function () {
      const buyerInitialBalance = await ethers.provider.getBalance(
        addr1.address
      );
      const sellerInitialBalance = await ethers.provider.getBalance(
        owner.address
      );
      const listingPrice = ethers.parseEther("1");
      const paymentAmount = ethers.parseEther("2");

      // 購買 NFT，支付 2 ETH（多付 1 ETH）
      const tx = await nftSwap
        .connect(addr1)
        .purchase(venApe.target, 1, { value: paymentAmount });

      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed * receipt.gasPrice;

      // 檢查買家最終餘額
      const buyerFinalBalance = await ethers.provider.getBalance(addr1.address);
      expect(buyerInitialBalance - buyerFinalBalance).to.equal(
        listingPrice + gasUsed,
        "Buyer should only pay listing price plus gas"
      );

      // 檢查賣家收到的金額
      const sellerFinalBalance = await ethers.provider.getBalance(
        owner.address
      );
      expect(sellerFinalBalance - sellerInitialBalance).to.equal(
        listingPrice,
        "Seller should receive exactly the listing price"
      );

      // 確認 NFT 所有權已轉移給買家
      expect(await venApe.ownerOf(1)).to.equal(
        addr1.address,
        "NFT should be transferred to buyer"
      );
    });

    /**
     * 測試支付金額不足的情況
     * 確保交易在支付金額小於掛單價格時會被拒絕
     */
    it("Should revert when insufficient ETH is sent", async function () {
      await expect(
        nftSwap
          .connect(addr1)
          .purchase(venApe.target, 1, { value: ethers.parseEther("0.5") })
      ).to.be.revertedWith("Increase price");
    });
  });
});
