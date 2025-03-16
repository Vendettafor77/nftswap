![image](https://github.com/user-attachments/assets/c3a7e54a-ea9a-41de-9829-87cfc7df59a1)# NFTスワッププラットフォーム

ブロックチェーン上でNFT（非代替性トークン）の取引を可能にする分散型プラットフォームです。
<img src="https://private-user-images.githubusercontent.com/184055968/423232822-7e035ff6-7a50-4ecc-9f69-5928d860bba1.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDIxNDQxNTEsIm5iZiI6MTc0MjE0Mzg1MSwicGF0aCI6Ii8xODQwNTU5NjgvNDIzMjMyODIyLTdlMDM1ZmY2LTdhNTAtNGVjYy05ZjY5LTU5MjhkODYwYmJhMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwMzE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDMxNlQxNjUwNTFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05OTAwOTVlODc1NWExZGE1NWJlYjBmOGE3MTA3MmQ1NzAwN2RmYjdjZTljMGZiYjMzMTQ1ZjY2MmM3N2JkMGNmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.eX1jlmU-faUDv3l2xT-OdNeeloABFA4ZKcHDeMVP0aI" alt="Logo" width="800" />

## 📋 プロジェクト概要

NFTスワッププラットフォームは、ユーザーがNFTを簡単かつ安全に取引できる分散型マーケットプレイスです。ブロックチェーン技術を活用し、中間業者なしでP2P取引を実現します。

### 主な機能

- **NFTの閲覧と購入**：様々なコレクションからNFTを探して購入
- **所有NFTの出品**：自分のNFTをマーケットプレイスに出品
- **VenAPE NFTのミント**：オリジナルVenAPE NFTの新規作成
- **NFTの転送**：所有NFTを他のウォレットアドレスに転送
- **取引履歴の確認**：過去の取引記録の閲覧
- **出品の取り消し**：マーケットに出品したNFTの取り消し
- **検索とフィルタリング**：条件に合ったNFTの検索

## 🚀 開発状況

**現在の開発フェーズ：**

- ✅ **スマートコントラクト開発**：

  - 独自設計のNFTSwapコントラクト実装
  - ERC-721規格に準拠したVenAPEコントラクト開発
  - Hardhatを用いた包括的なテスト環境構築

- ⏳ **ミドルレイヤー開発**：

  - ethers.js v6によるブロックチェーン連携機能実装
  - スマートコントラクト関数の効率的なラッパー設計
  - IPFSメタデータストレージシステム構築中

- ⏳ **フロントエンド開発**：
  - React+JSベースのモダンUI設計
  - コンポーネント指向アーキテクチャの構築
  - レスポンシブデザインの実装
  - Web3ウォレット連携機能の開発

> **注意**: 現時点ではフロントエンドUIのほとんどがモックデータで表示されています。実際のブロックチェーンとの対話機能は実装中です。

## 💻 技術スタック

- **フロントエンド**：React, JavaScript, Styled Components
- **ブロックチェーン連携**：ethers.js v6
- **スマートコントラクト**：Solidity, Hardhat
- **データストレージ**：IPFS
- **テスト**：Jest, React Testing Library

## 📁 プロジェクト構造

```
nft-swap-platform/
├── contracts/                 # スマートコントラクト
│   ├── NFTSwap.sol            # メインスワップコントラクト
│   └── VenAPE.sol             # VenAPE NFTコントラクト
├── frontend/                  # フロントエンドアプリケーション
│   ├── public/                # 静的ファイル
│   ├── src/                   # ソースコード
│   │   ├── components/        # UIコンポーネント
│   │   ├── pages/             # ページコンポーネント
│   │   ├── hooks/             # カスタムReactフック
│   │   ├── contexts/          # Reactコンテキスト
│   │   ├── utils/             # ユーティリティ関数
├── scripts/                   # デプロイスクリプト
└── test/                      # テストファイル
```

## 🔄 開発ロードマップと個人的取り組み

1. **フェーズ1**: スマートコントラクト開発（完了）

   - **個人的成果**: Solidityによるセキュアなコントラクト設計と実装
   - ERC-721規格の深い理解と応用

2. **フェーズ2**: ミドルレイヤー開発（進行中）

   - **個人的成果**: ethers.jsを活用した堅牢なブロックチェーン連携層の構築
   - 非同期トランザクション処理の効率化
   - IPFSとの統合によるメタデータ管理システム設計

3. **フェーズ3**: フロントエンド開発（進行中）

   - **個人的成果**: ReactとJavaScriptを用いたSPA構築
   - コンポーネント設計とステート管理の最適化
   - Web3接続機能の効率的な実装

4. **フェーズ4**: テストとデプロイ（2025年4月以前予定）
   - **計画**: 包括的なテスト戦略の立案と実行
   - セキュリティ監査の実施
   - テストネットからメインネットへの段階的デプロイ

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。
