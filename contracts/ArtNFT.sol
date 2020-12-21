// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("ArtToken", "ART") {}

    function mint(address receiver, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newArtId = _tokenIds.current();
        _mint(receiver, newArtId);
        _setTokenURI(newArtId, tokenURI);
        return newArtId;
    }
}
