pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol";

contract GameNFT is ERC721Metadata {
    uint256 public tokenId;
    mapping(address => uint256) public gameTrack;

    constructor() public ERC721Metadata("Game Token", "GAME") {
        tokenId = 0;
    }

    function createNFT(address receiver, string calldata metadata) external returns (uint256) {
        tokenId++;
        _mint(receiver, tokenId);
        _setTokenURI(tokenId, metadata);
        gameTrack[receiver] = tokenId;
        return tokenId;
    }

    function transferNFT(
        address sender,
        address receiver,
        uint256 _tokenId,
        string calldata metadata
    ) external {
        _transferFrom(sender, receiver, _tokenId);
        _setTokenURI(_tokenId, metadata);
        delete gameTrack[sender];
        gameTrack[receiver] = _tokenId;
    }
}
