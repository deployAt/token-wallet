// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MarsToken is ERC20 {
    constructor() public ERC20("MarsToken", "MRS") {
        _mint(msg.sender, 1000);
    }
}
