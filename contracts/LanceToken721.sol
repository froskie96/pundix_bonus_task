// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/// @notice LanceToken721 token contract.
contract LanceToken721 is ERC721("Lance Token", "LANCE"), Pausable {
    /// @notice The mint counter.
    /// @dev The mint counter increments on each mint.
    uint256 public mintCounter;

    /// @notice Mint a new token.
    /// @param to The address of the token owner.
    /// @param tokenId The token ID.
    function mint(address to, uint256 tokenId) external {
        mintCounter++;
        _mint(to, tokenId);
    }

    /// @notice Burn a token.
    /// @param tokenId The token ID.
    function burn(uint256 tokenId) external {
        _burn(tokenId);
    }

    /// @notice Pause the contract.
    function pause() external whenNotPaused {
        _pause();
    }
}
