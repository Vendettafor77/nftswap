// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./WTFApe.sol";

contract NFTSwap is IERC721Receiver {
    event List(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event Purchase(
        address indexed buyer,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 price
    );
    event Revoke(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId
    );
    event Update(
        address indexed seller,
        address indexed nftAddr,
        uint256 indexed tokenId,
        uint256 newPrice
    );

    // 定义order结构体
    struct Order {
        address owner;
        uint256 price;
    }
    // NFT Order映射
    mapping(address => mapping(uint256 => Order)) public nftList;

    fallback() external payable {}

    receive() external payable {}

    // 挂单: 卖家上架NFT，合约地址为_nftAddr，tokenId为_tokenId，价格_price为以太坊（单位是wei）
    function list(address _nftAddr, uint256 _tokenId, uint256 _price) public {
        require(_nftAddr != address(0), "Invalid NFT address");
        require(_price > 0, "Price must be greater than 0");
        
        IERC721 _nft = IERC721(_nftAddr); // 声明IERC721接口合约变量
        require(_nft.ownerOf(_tokenId) == msg.sender, "Not token owner"); // 檢查 NFT 是否屬於發送者
        require(_nft.getApproved(_tokenId) == address(this), "Need Approval"); // 檢查合約是否已獲得授權
        
        Order storage _order = nftList[_nftAddr][_tokenId];
        require(_order.owner == address(0) && _order.price == 0, "NFT already listed"); // 確保 NFT 未被掛單
        
        // 先設置訂單信息
        _order.owner = msg.sender;
        _order.price = _price;
        
        // 最後執行 NFT 轉移
        try _nft.safeTransferFrom(msg.sender, address(this), _tokenId) {
            emit List(msg.sender, _nftAddr, _tokenId, _price);
        } catch {
            // 如果轉移失敗，重置訂單信息
            delete nftList[_nftAddr][_tokenId];
            revert("NFT transfer failed");
        }
    }

    // 购买: 买家购买NFT，合约为_nftAddr，tokenId为_tokenId，调用函数时要附带ETH
    function purchase(address _nftAddr, uint256 _tokenId) public payable {
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order
        require(_order.price > 0, "Invalid Price"); // NFT价格大于0
        require(msg.value >= _order.price, "Increase price"); // 购买价格大于标价
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 将NFT转给买家
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        // 将ETH转给卖家
        payable(_order.owner).transfer(_order.price);
        // 多余ETH给买家退款
        if (msg.value > _order.price) {
            payable(msg.sender).transfer(msg.value - _order.price);
        }

        // 释放Purchase事件
        emit Purchase(msg.sender, _nftAddr, _tokenId, _order.price);

        delete nftList[_nftAddr][_tokenId]; // 删除order
    }

    // 撤单： 卖家取消挂单
    function revoke(address _nftAddr, uint256 _tokenId) public {
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order
        require(_order.owner == msg.sender, "Not Owner"); // 必须由持有人发起
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 将NFT转给卖家
        _nft.safeTransferFrom(address(this), msg.sender, _tokenId);
        delete nftList[_nftAddr][_tokenId]; // 删除order

        // 释放Revoke事件
        emit Revoke(msg.sender, _nftAddr, _tokenId);
    }

    // 调整价格: 卖家调整挂单价格
    function update(
        address _nftAddr,
        uint256 _tokenId,
        uint256 _newPrice
    ) public {
        require(_newPrice > 0, "Invalid Price"); // NFT价格大于0
        Order storage _order = nftList[_nftAddr][_tokenId]; // 取得Order
        require(_order.owner == msg.sender, "Not Owner"); // 必须由持有人发起
        // 声明IERC721接口合约变量
        IERC721 _nft = IERC721(_nftAddr);
        require(_nft.ownerOf(_tokenId) == address(this), "Invalid Order"); // NFT在合约中

        // 调整NFT价格
        _order.price = _newPrice;

        // 释放Update事件
        emit Update(msg.sender, _nftAddr, _tokenId, _newPrice);
    }

    // 实现{IERC721Receiver}的onERC721Received，能够接收ERC721代币
    function onERC721Received(
        address operator,
        address from,
        uint tokenId,
        bytes calldata data
    ) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    // 添加 getListedNFTs 方法
    function getListedNFTs(
        address _nftAddr
    ) public view returns (uint256[] memory, uint256[] memory) {
        uint256 total = 0;
        for (uint256 i = 0; i < 10000; i++) {
            if (nftList[_nftAddr][i].price > 0) {
                total++;
            }
        }

        uint256[] memory tokenIds = new uint256[](total);
        uint256[] memory prices = new uint256[](total);
        uint256 index = 0;
        for (uint256 i = 0; i < 10000; i++) {
            if (nftList[_nftAddr][i].price > 0) {
                tokenIds[index] = i;
                prices[index] = nftList[_nftAddr][i].price;
                index++;
            }
        }

        return (tokenIds, prices);
    }
}
