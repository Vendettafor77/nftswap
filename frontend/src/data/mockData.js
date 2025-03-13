/**
 * @file mockData.js
 * @description 此文件包含整個應用程序使用的所有模擬數據。
 * 集中管理模擬數據可確保不同組件之間的數據一致性。
 */

// NFT集合列表 - 用於下拉選擇
export const NFT_COLLECTIONS = [
  "すべて", // 全部
  "WTFape コレクション",
  "Doodles Collection",
  "Azuki",
  "Cool Cats",
  "Samurai Collection",
  "CryptoPunks",
];

/**
 * 用户擁有的NFT列表
 * @type {Array<Object>}
 */
export const myNFTs = [
  {
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    tokenId: "001",
    name: "サムライNFT",
    collection: "Samurai Collection",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03",
  },
  {
    tokenId: "785",
    name: "WTFape #785",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    tokenId: "612",
    name: "WTFape #612",
    collection: "WTFape コレクション",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
];

/**
 * 市場上銷售的NFT列表
 * @type {Array<Object>}
 */
export const marketNFTs = [
  {
    id: "1",
    tokenId: "221",
    name: "WTFape #221",
    collection: "WTFape コレクション",
    price: "0.25",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x7a86C6eA37F51a9B15aEb408b7c9702e8A718045",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "2",
    tokenId: "453",
    name: "WTFape #453",
    collection: "WTFape コレクション",
    price: "0.31",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x3bE4890086D61dCC39D5b27f31e64E194fEaE78B",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "3",
    tokenId: "874",
    name: "WTFape #874",
    collection: "WTFape コレクション",
    price: "0.18",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x4A82692bB5E1e8e7B24DAfd6e8D7E67c2f5EEdDa",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "4",
    tokenId: "612",
    name: "WTFape #612",
    collection: "WTFape コレクション",
    price: "0.52",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x9c92c2eA0bb7b7cC7C49E97FBc87fbEa856Aac73",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "5",
    tokenId: "002",
    name: "Doodle #123",
    collection: "Doodles Collection",
    price: "1.52",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x9c92c2eA0bb7b7cC7C49E97FBc87fbEa856Aac73",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "6",
    tokenId: "003",
    name: "Doodle #456",
    collection: "Doodles Collection",
    price: "2.01",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x4A82692bB5E1e8e7B24DAfd6e8D7E67c2f5EEdDa",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "7",
    tokenId: "004",
    name: "Doodle #789",
    collection: "Doodles Collection",
    price: "1.25",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x3bE4890086D61dCC39D5b27f31e64E194fEaE78B",
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "8",
    tokenId: "005",
    name: "Azuki #345",
    collection: "Azuki",
    price: "3.75",
    image:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    seller: "0x7a86C6eA37F51a9B15aEb408b7c9702e8A718045",
    contractAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  },
];

/**
 * 交易歷史記錄列表
 * @type {Array<Object>}
 */
export const mockTransactions = [
  {
    id: "tx1",
    type: "purchase",
    nftName: "Bored Ape #123",
    nftCollection: "Bored Ape Yacht Club",
    nftImage:
      "https://ipfs.io/ipfs/QmRRPWG96cmgTn2qSzjwr2qvfNEuhunv6FNeMFGa9bx6mQ",
    price: 2.5,
    date: "2023-03-15T14:22:30Z",
    from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    to: "0xYourAddress", // 當前用戶地址
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "tx2",
    type: "sale",
    nftName: "Crypto Punk #456",
    nftCollection: "CryptoPunks",
    nftImage:
      "https://ipfs.io/ipfs/QmPbxeGcXhYQQNgsC6a36dDyYUcHgMLnGKnF8pVFmGsvqi",
    price: 3.2,
    date: "2023-03-10T09:45:12Z",
    from: "0xYourAddress", // 當前用戶地址
    to: "0x7AB4C5D89e6D8CA8740eA9c5F1c8d536BBBF88F3",
    contractAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  },
  {
    id: "tx3",
    type: "mint",
    nftName: "WTFApe #789",
    nftCollection: "WTFApe",
    nftImage:
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq",
    price: 0.1, // 鑄造費用
    date: "2023-03-01T18:11:05Z",
    from: "0x0000000000000000000000000000000000000000", // 零地址表示鑄造
    to: "0xYourAddress", // 當前用戶地址
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "tx4",
    type: "transfer",
    nftName: "Doodle #234",
    nftCollection: "Doodles",
    nftImage:
      "https://ipfs.io/ipfs/QmPMc4tcBsMqLRuCQtPmPe84bpSjrC3Ky7t3JWuHXYB4aS/234",
    price: 0, // 轉移沒有價格
    date: "2023-02-25T22:30:45Z",
    from: "0xYourAddress", // 當前用戶地址
    to: "0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF", // 接收方地址
    contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    id: "tx5",
    type: "purchase",
    nftName: "Azuki #567",
    nftCollection: "Azuki",
    nftImage:
      "https://ipfs.io/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/567",
    price: 1.8,
    date: "2023-02-20T10:35:22Z",
    from: "0x8731d54E9D02c286767d56ac03e8037C07e01e98",
    to: "0xYourAddress",
    contractAddress: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  },
  {
    id: "tx6",
    type: "mint",
    nftName: "WTFApe #142",
    nftCollection: "WTFApe",
    nftImage:
      "https://ipfs.io/ipfs/QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/142",
    price: 0.1,
    date: "2023-02-15T16:28:30Z",
    from: "0x0000000000000000000000000000000000000000",
    to: "0xYourAddress",
    contractAddress: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  },
  {
    id: "tx7",
    type: "sale",
    nftName: "Cool Cat #321",
    nftCollection: "Cool Cats",
    nftImage:
      "https://ipfs.io/ipfs/QmdTtQXUNuLYwX52r5KHUKm8taSv8eFhkj3iCmrLiUXS9k/321",
    price: 1.2,
    date: "2023-02-10T08:12:45Z",
    from: "0xYourAddress",
    to: "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",
    contractAddress: "0x1A92f7381B9F03921564a437210bB9396471050C",
  },
];

/**
 * 查找NFT函數 - 用於在不同數組中查找NFT
 * @param {string} tokenId - NFT的tokenId
 * @param {string} collectionName - 可選的收藏名稱
 * @returns {Object|null} - 找到的NFT對象或null
 */
export const findNFTByTokenId = (tokenId, collectionName = null) => {
  // 首先在我的NFT中查找
  let foundNFT = myNFTs.find(
    (nft) =>
      nft.tokenId === tokenId &&
      (collectionName ? nft.collection === collectionName : true)
  );

  // 如果在我的NFT中未找到，則在市場NFT中查找
  if (!foundNFT) {
    foundNFT = marketNFTs.find(
      (nft) =>
        nft.tokenId === tokenId &&
        (collectionName ? nft.collection === collectionName : true)
    );
  }

  return foundNFT || null;
};

/**
 * 獲取所有可用的NFT收藏
 * @returns {Array<string>} 收藏名稱數組
 */
export const getAvailableCollections = () => {
  // 從我的NFT和市場NFT中提取所有唯一的收藏名稱
  const collections = new Set([
    ...myNFTs.map((nft) => nft.collection),
    ...marketNFTs.map((nft) => nft.collection),
  ]);

  return ["すべて", ...Array.from(collections)];
};
