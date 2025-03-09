# NFT交易平台

一個基於以太坊區塊鏈的NFT（非同質化代幣）交易平台，支持NFT的鑄造、上架、購買、撤回和轉移等功能。

## 目錄

- [用戶操作指南](#用戶操作指南)
  - [連接錢包](#連接錢包)
  - [瀏覽和購買NFT](#瀏覽和購買nft)
  - [搜索和過濾NFT](#搜索和過濾nft)
  - [鑄造WTFApe NFT](#鑄造wtfape-nft)
  - [管理我的NFT](#管理我的nft)
  - [上架NFT出售](#上架nft出售)
  - [撤回上架的NFT](#撤回上架的nft)
  - [轉移NFT](#轉移nft)
  - [查看交易記錄](#查看交易記錄)
- [開發者文檔](#開發者文檔)
  - [項目結構](#項目結構)
  - [前端組件](#前端組件)
  - [主要頁面](#主要頁面)
  - [工具函數](#工具函數)
  - [智能合約](#智能合約)
  - [狀態管理](#狀態管理)
  - [樣式系統](#樣式系統)
  - [開發和部署](#開發和部署)

---

# 用戶操作指南

## 連接錢包

1. 進入網站後，點擊右上角的「錢包連接」按鈕
2. 選擇您喜歡的錢包提供商（如MetaMask）
3. 按照錢包提示完成授權連接
4. 連接成功後，右上角會顯示您的錢包地址簡寫和ETH餘額

## 瀏覽和購買NFT

1. 在主頁的「NFTを閲覧・購入」標籤可以瀏覽所有上架的NFT
2. 每個NFT卡片顯示圖片、名稱、收藏集名稱和價格
3. 點擊NFT卡片上的「購入する」按鈕可以購買該NFT
4. 確認交易信息，包括支付的ETH數量
5. 在錢包中核對交易詳情並確認
6. 交易提交後會顯示「購入成功！」或「購入失敗」的狀態提示
7. 購買成功後，NFT將顯示在「我的NFT」頁面中

## 搜索和過濾NFT

1. 在頁面頂部的搜索欄輸入關鍵詞可即時搜索NFT名稱，搜索結果會隨著輸入內容自動更新
2. 使用「すべてのコレクション」下拉菜單選擇特定的NFT收藏集
3. 使用排序選項「最新順」、「価格（安い順）」、「価格（高い順）」對NFT進行排序
4. 搜索和過濾選項會即時更新顯示結果，右側側邊欄顯示「表示中」NFT數量

## 鑄造WTFApe NFT

1. 從頂部導航欄選擇「鑄造」頁面
2. 在鑄造頁面中，輸入您想鑄造的WTFApe ID（0-9999）
3. 使用「ランダム」按鈕隨機生成ID，或使用「前へ」和「次へ」按鈕切換ID
4. 查看預覽圖了解NFT的外觀
5. 點擊「鑄造する」按鈕開始鑄造流程
6. 在錢包中確認交易
7. 鑄造完成後，新的WTFApe NFT將添加到您的NFT列表中

## 管理我的NFT

1. 點擊頂部導航欄的「我的NFT」進入管理頁面
2. 查看您擁有的所有NFT，包括已購買和已鑄造的
3. 使用搜索框和過濾器找到特定NFT
4. 每個NFT卡片底部的操作按鈕提供管理選項（上架、轉移等）

## 上架NFT出售

1. 在主頁切換到「NFTを出品する」標籤
2. 從您的NFT列表中選擇要出售的NFT（點擊「選択する」按鈕）
3. 在右側表單中設置出售價格（以ETH為單位）
4. 點擊「マーケットに出品する」（上架到市場）按鈕
5. 首次上架需要先授權合約操作您的NFT，確認授權交易
6. 然後確認上架交易
7. 交易確認後，您的NFT將顯示在市場上

## 撤回上架的NFT

1. 在「我的NFT」頁面找到已上架的NFT
2. 點擊操作按鈕，選擇「撤回」選項
3. 確認撤回交易
4. 交易確認後，NFT將從市場撤回並返回您的NFT列表

## 轉移NFT

1. 在「我的NFT」頁面找到要轉移的NFT
2. 點擊操作按鈕，選擇「轉移」選項
3. 在彈出的轉移窗口中，輸入接收者的以太坊地址
4. 確認轉移操作
5. 在錢包中確認交易
6. 交易確認後，NFT將從您的列表中移除並轉移給接收者

## 查看交易記錄

1. 點擊頂部導航欄的「取引履歴」進入交易記錄頁面
2. 查看您的所有NFT交易歷史，包括購買、銷售、鑄造和轉移記錄
3. 每條交易記錄顯示NFT圖片、名稱、交易類型、價格和日期
4. 使用搜索欄根據NFT名稱搜索特定交易，搜索結果會隨著輸入內容即時更新
5. 使用交易類型過濾器（すべての取引、購入、販売、鋳造、転送）篩選特定類型的交易
6. 使用排序選項（最新順、価格（高い順）、価格（安い順））對交易記錄進行排序
7. 地址會顯示為簡化格式（前6位和後4位）以便於識別

---

# 開發者文檔

## 項目結構

```
frontend/
├── public/           # 靜態資源
├── src/              # 源代碼
│   ├── abis/         # 合約ABI文件
│   ├── components/   # 可復用組件
│   ├── contexts/     # React上下文
│   ├── data/         # 模擬數據
│   ├── pages/        # 頁面組件
│   │   ├── Home/     # 主頁（市場和出品）
│   │   ├── MyNFTs/   # 我的NFT頁面
│   │   ├── MintWTFape/ # 鑄造頁面
│   │   └── TransactionHistory/ # 交易記錄頁面
│   ├── styles/       # 全局樣式
│   ├── theme/        # 主題配置
│   ├── utils/        # 工具函數
│   ├── App.js        # 應用主組件
│   ├── index.js      # 入口文件
│   └── routes.js     # 路由配置
contracts/            # 智能合約
├── NFTSwap.sol       # 交易合約
├── WTFApe.sol        # NFT合約
└── ...               # 其他輔助合約
```

## 前端組件

### 核心組件

- **NFTCard** (`components/NFTCard/NFTCard.js`): 顯示NFT信息的卡片組件，支持狀態顯示和自定義操作按鈕
- **NFTGrid** (`components/NFTGrid/NFTGrid.js`): 以響應式網格布局展示NFT卡片的組件，支持空狀態顯示
- **FilterBar** (`components/Filters/FilterBar.js`): 通用過濾和搜索組件，支持自定義過濾器配置，用於市場和交易記錄頁面，提供即時搜索功能
- **StatusMessage** (`components/styled/StatusMessage.js`): 狀態信息提示組件，用於顯示操作成功或失敗
- **Button** (`components/styled/Button.js`): 包含主要按鈕(PrimaryButton)、輪廓按鈕(OutlineButton)和次要按鈕(SecondaryButton)樣式
- **TransactionCard** (`pages/TransactionHistory/components/TransactionCard.js`): 顯示交易記錄的卡片組件

### 樣式組件

- **GlobalStyle** (`components/styled/GlobalStyle.js`): 全局樣式設置
- **HeroSection** (`components/styled/index.js`): 頁面主要區塊樣式
- **SectionTitle** (`components/styled/SectionTitle.js`): 標題樣式組件
- **CustomSelect** (`components/CustomSelect/CustomSelect.js`): 自定義下拉選擇器組件

## 主要頁面

### Home.js (`pages/Home/Home.js`)

主頁面，包含兩個標籤：

- **NFTを閲覧・購入**: 展示所有上架的NFT，支持搜索、過濾和排序
- **NFTを出品する**: 上架自己的NFT

**主要函數**:

- `renderSidebarContent()`: 根據當前標籤渲染側邊欄內容
- `handleBuy(nft)`: 處理NFT購買流程及狀態更新
- `filteredNFTs`: 基於搜索、過濾和排序條件處理NFT顯示

### MyNFTs.js (`pages/MyNFTs/MyNFTs.js`)

用戶NFT管理頁面，展示用戶所有NFT並提供操作選項。

**主要函數**:

- `fetchUserNFTs()`: 獲取用戶擁有的NFT
- `handleNFTAction(nft)`: 處理NFT操作選擇
- `handleListNFT(nft)`: 處理NFT上架
- `handleTransfer(nft)`: 處理NFT轉移
- `handleSendNFT(nft)`: 處理NFT發送

### MintWTFape.js (`pages/MintWTFape/MintWTFape.js`)

WTFApe NFT鑄造頁面，允許用戶選擇ID並鑄造NFT。

**主要函數**:

- `handleTokenIdChange(e)`: 處理代幣ID輸入變更
- `handleMint()`: 處理NFT鑄造邏輯
- `handleRandomPreview()`: 生成隨機ID預覽
- `handlePrevious()/handleNext()`: 切換ID上一個/下一個

### TransactionHistory.js (`pages/TransactionHistory/TransactionHistory.js`)

交易記錄頁面，展示用戶所有NFT相關交易。

**主要函數**:

- `updateSearchTerm()`: 處理搜索詞變更
- `updateTypeFilter()`: 處理交易類型過濾變更
- `updateSortBy()`: 處理排序變更
- `filteredTransactions`: 基於搜索、過濾和排序條件處理交易記錄

### ListNFTSection.js (`pages/Home/components/ListNFTSection.js`)

NFT上架區塊，包含NFT選擇功能。

**主要函數**:

- `onAction(nft)`: 處理NFT選中/取消
- `renderActionButton(nft)`: 渲染NFT操作按鈕

### ListNFTForm.js (`pages/Home/components/ListNFTForm.js`)

NFT上架表單，用於設置價格並提交上架。

**主要函數**:

- `handlePriceChange(e)`: 處理價格變更
- `handleListNFT()`: 處理NFT上架提交

## 工具函數

### nftSwap.js (`utils/nftSwap.js`)

智能合約交互函數。

**主要函數**:

- `getNftSwapContract()`: 獲取NFTSwap合約實例
- `getWtfApeContract()`: 獲取WTFApe合約實例
- `mintWtfApe(to, tokenId)`: 鑄造WTFApe NFT
- `getListedNFTs(nftAddr)`: 獲取上架的NFT列表
- `listNFT(nftAddr, tokenId, price)`: 上架NFT
- `revokeNFT(nftAddr, tokenId)`: 撤回上架的NFT
- `updateNFTPrice(nftAddr, tokenId, newPrice)`: 更新NFT價格
- `purchaseNFT(nftAddr, tokenId, price)`: 購買NFT

### dateUtils.js (`utils/dateUtils.js`)

日期處理工具函數。

**主要函數**:

- `formatDate(dateString)`: 將ISO日期字符串格式化為可讀形式（日本格式）

## 智能合約

### NFTSwap.sol

NFT交易市場合約，處理NFT的上架、購買、撤回和價格更新。

**主要函數**:

- `list(address _nftAddr, uint256 _tokenId, uint256 _price)`: 上架NFT，將NFT轉入合約
- `purchase(address _nftAddr, uint256 _tokenId)`: 購買NFT，支付ETH並將NFT轉移給買家
- `revoke(address _nftAddr, uint256 _tokenId)`: 撤回上架的NFT，將NFT歸還賣家
- `update(address _nftAddr, uint256 _tokenId, uint256 _newPrice)`: 更新NFT價格
- `getListedNFTs(address _nftAddr)`: 獲取指定合約地址上架的所有NFT

### WTFApe.sol

WTFApe NFT合約，繼承自ERC721標準，允許鑄造和管理WTFApe NFT。

**主要函數**:

- `mint(address to, uint256 tokenId)`: 鑄造新的WTFApe NFT，tokenId範圍為0-9999
- `_baseURI()`: 返回NFT元數據的IPFS URI

## 狀態管理

項目使用React hooks和context進行狀態管理：

- **AnimationContext** (`contexts/AnimationContext.js`): 管理全局動畫設置
- 組件內部使用useState、useCallback和useMemo進行本地狀態管理和性能優化

## 樣式系統

使用styled-components實現，主題配置在`theme.js`中定義。包括：

- 顏色系統（主色、背景色、表面色、文本色）
- 間距規範（xs、sm、md、lg、xl）
- 陰影效果（small、medium、large）
- 邊框半徑（small、medium、large）
- 響應式斷點（針對不同屏幕尺寸優化）
- 已優化的搜索交互體驗，防止搜索結果變化時的布局偏移
- 自定義滾動條樣式，提升視覺美感

## 開發和部署

### 本地開發

1. 安裝依賴: `npm install`
2. 啟動前端: `npm start`
3. 編譯合約: `npx hardhat compile`
4. 測試合約: `npx hardhat test`

### 部署

1. 部署合約: `npx hardhat run scripts/deploy.js --network <network-name>`
2. 更新前端合約地址:
   - 在`utils/nftSwap.js`中更新nftSwapAddress和wtfApeAddress
3. 構建前端: `npm run build`
4. 部署靜態文件到托管服務

## 技術架構

### 前端

- React.js框架
- styled-components用於樣式管理
- ethers.js用於與區塊鏈交互
- React Router用於頁面路由

### 智能合約

- Solidity編寫
- 包含NFTSwap.sol（交易合約）和WTFApe.sol（NFT合約）
- 使用Hardhat進行開發和測試

## 智能合約功能

### NFTSwap.sol

- `list(address _nftAddr, uint256 _tokenId, uint256 _price)`: 上架NFT
- `purchase(address _nftAddr, uint256 _tokenId)`: 購買NFT
- `revoke(address _nftAddr, uint256 _tokenId)`: 撤回上架的NFT
- `update(address _nftAddr, uint256 _tokenId, uint256 _newPrice)`: 更新NFT價格

### WTFApe.sol

- `mint(address to, uint256 tokenId)`: 鑄造新的WTFApe NFT，tokenId範圍為0-9999

## 開發者信息

如有任何問題或建議，請通過以下方式聯繫我們：

- Email: example@example.com
- GitHub: [項目問題頁面](https://github.com/yourusername/nftSwap/issues)

## 授權許可

本項目基於MIT許可證開源。
