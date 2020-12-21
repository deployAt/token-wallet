// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JupiterToken is ERC20 {
    constructor() public ERC20("JupiterToken", "JPT") {
        _mint(msg.sender, 1000);
    }

    function mint(address receiver, uint256 amount) public {
        _mint(receiver, amount);
    }
}
