// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract SimpleStorage {
   string public value;
    constructor () {
        value = "Hey boy";
    }
    function set(string memory x) public {
        value = x;
    }

    function get() public view returns (string memory) {
        return value;
    }
   
}