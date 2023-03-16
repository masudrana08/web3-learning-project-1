// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Transaction {
//  Address to Smart Contract deposite 
function deposite() external payable{}

// Smart Contract to Address Deposite 
function withdraw(address payable _to, uint amount) external{
    _to.transfer(amount);
}
// Get Smart Contract Balance 
function getBalance () external view returns(uint){
    return address(this).balance;
}

// Get Smart Contract Address 
function getAddress() external view returns(address){
    return address(this);
}

}