// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import './DEXToken.sol';

contract TokeSwap is ReentrancyGuard {
  DEXToken public token;
  uint public ethToDexRatio = 10;
  constructor(DEXToken _token) {
    token = _token;
  }
  function swapEthToDex() payable public nonReentrant {
    uint sendDexToken = msg.value * ethToDexRatio;
    require(sendDexToken <= token.balanceOf(address(this)), "Not enough liquidity");
    token.transfer(msg.sender, sendDexToken);
  }
  function swapDexToEth(uint _amount) public nonReentrant {
    uint sendEth = _amount / ethToDexRatio;
    require(sendEth <= address(this).balance, "Not enough liquidity");
    token.approve(msg.sender, address(this), _amount);
    token.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(sendEth);
  }
}
