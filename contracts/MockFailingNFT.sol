// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MockFailingNFT {
    string public name = "MockFailingNFT";
    string public symbol = "MOCK";

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;

    // 這個合約只是為了模擬轉帳失敗的情況
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public {
        revert("Transfer failed");
    }

    function mint(address to, uint256 tokenId) public {
        _balances[to]++;
        _owners[tokenId] = to;
    }

    // 以下是 ERC721 的必要接口實現，僅供測試使用
    function balanceOf(address owner) public view returns (uint256) {
        return _balances[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    function approve(address to, uint256 tokenId) public {
        _tokenApprovals[tokenId] = to;
    }

    function getApproved(uint256 tokenId) public view returns (address) {
        return _tokenApprovals[tokenId];
    }

    function setApprovalForAll(address operator, bool approved) public {
        // 模擬 setApprovalForAll 行為
    }

    function isApprovedForAll(
        address owner,
        address operator
    ) public view returns (bool) {
        return false; // 模擬檢查批准
    }

    // 其他必要的 ERC721 接口方法
}
