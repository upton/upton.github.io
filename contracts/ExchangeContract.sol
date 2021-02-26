// SPDX-License-Identifier: GPLv3
pragma solidity ^0.5.15;

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

contract ERC20 {
    function transfer(address to, uint value) public returns (bool);
}

contract ExchangeContract is Ownable {
    uint constant MAX_EXCHANGE  = 1000 trx;
    uint constant EXCHANGE_RATE = 10;

    uint exchange_start;
    uint total_amount;
    uint total_user_count;
    ERC20 xxoo;

    struct User{
        bool exchanged;
        uint ex_date;
        uint ex_amount;
    }
    mapping(address => User) users;

    event Exchange(address indexed who, uint value);

    constructor(uint _total_amount, address _xxoo_addr) public {
        total_amount = _total_amount;
        xxoo = ERC20(_xxoo_addr);
    }

    function exchange() public payable returns (bool){
        require(exchange_start > 0, "exchange not yet start");
        require(users[msg.sender].exchanged == false, "already exchanged");
        require(msg.value > 10 && msg.value <= MAX_EXCHANGE, "incorrect value");
        uint exchang_amount = msg.value / EXCHANGE_RATE;
        require(exchang_amount <= total_amount, "Insufficient xxoo amount");

        users[msg.sender].exchanged = true;
        users[msg.sender].ex_date   = block.timestamp;
        users[msg.sender].ex_amount = exchang_amount;

        total_user_count++;
        total_amount -= exchang_amount;

        xxoo.transfer(msg.sender, exchang_amount);
        emit Exchange(msg.sender, exchang_amount);

        return true;
    }

    function start() public onlyOwner returns (bool) {
        exchange_start = block.timestamp;
        return true;
    }

    function query_user(address addr) public view returns (bool, uint, uint) {
        return (users[addr].exchanged,
                users[addr].ex_date,
                users[addr].ex_amount);
    }

    function query_summary() public view returns (uint, uint) {
        return (total_amount, total_user_count);
    }
}