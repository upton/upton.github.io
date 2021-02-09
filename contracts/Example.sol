// SPDX-License-Identifier: GPLv3
pragma solidity ^0.5.10;

contract Ownable {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "only owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner returns (bool) {
        require(newOwner != address(0), "address is null");
        owner = newOwner;
        return true;
    }
}

contract Example is Ownable {
    

    constructor(uint max) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * (10 ** decimals);
        balances[msg.sender] = totalSupply;
    }
