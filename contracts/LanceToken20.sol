// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol";

/// @notice LanceToken20 token contract.
contract LanceToken20 is
    ERC20PresetFixedSupply(
        "Lance Token",
        "LANCE",
        100000000000000000000000,
        msg.sender
    )
{

}
