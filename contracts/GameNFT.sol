// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("GameToken", "GME") {}

    function mint(address receiver, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newGameId = _tokenIds.current();
        _mint(receiver, newGameId);
        _setTokenURI(newGameId, tokenURI);
        return newGameId;
    }
}
