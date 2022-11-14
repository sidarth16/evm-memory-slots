// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StorageTestMap {
  uint256 a;     // slot 0
  uint256[2] b;  // slots 1-2

  mapping (uint256 => uint256) c; //slot 3

  mapping(uint256 => mapping(uint256 => bool)) d; //slot 4

  constructor () {
    c[2] = 5;
    c[7] = 10;
    c[100] = 103; 

    d[0][7] = true;
    d[1][6] = false;
  }
}