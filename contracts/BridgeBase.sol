//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RGToken.sol";

contract BridgeBase {
    address public admin;
    RGToken public token;
    uint256 public nonce;
    mapping(uint256 => bool) public processedNonces;

    enum Step {
        burn,
        mint
    }

    event Transfer(
        address from,
        address to,
        uint256 amount,
        uint256 date,
        uint256 nonce,
        Step indexed step
    );

    constructor(address _token) {
        admin = msg.sender;
        token = RGToken(_token);
    }

    function burn(address to, uint256 amount) external {
        token.burn(msg.sender, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            nonce,
            Step.burn
        );
        nonce++;
    }

    function mint(
        address to,
        uint256 amount,
        uint256 otherChainNonce
    ) external {
        require(msg.sender == admin, "only admin");
        require(
            processedNonces[otherChainNonce] == false,
            "transfer already processed"
        );
        processedNonces[otherChainNonce] = true;
        token.mint(to, amount);
        emit Transfer(
            msg.sender,
            to,
            amount,
            block.timestamp,
            otherChainNonce,
            Step.mint
        );
    }
}
