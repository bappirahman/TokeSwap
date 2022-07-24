// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract DEXToken is ERC20, Ownable {
  address public TokeSwap;
  constructor()   ERC20('DEXToken', 'DEX') {
    _mint(msg.sender, 1000000 * 10 ** 18);
  }
  // 
  function setTokeSwapAddress(address _tokeSwap) public onlyOwner {
    TokeSwap = _tokeSwap;
  }
  function approve(address _owner,
        address _spender,
        uint256 _amount
        ) public {
    require(msg.sender == TokeSwap,"Your not approved to set");
    _approve(_owner, _spender, _amount);
    // return msg.sender;
  }
}
