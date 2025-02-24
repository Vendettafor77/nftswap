import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

const WalletConnect = ({ setWalletAddress }) => {
  const [connectedAddress, setConnectedAddress] = useState('');

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMaskをインストールしてください");
      return;
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);
      setConnectedAddress(address);
      console.log("接続成功:", address);
    } catch (error) {
      console.error("ウォレット接続エラー:", error);
      alert("ウォレット接続に失敗しました");
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>
        {connectedAddress ? 'ウォレット接続済み' : 'ウォレットに接続'}
      </button>
      {connectedAddress && (
        <p>接続中のアドレス: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}</p>
      )}
    </div>
  );
};

export default WalletConnect;