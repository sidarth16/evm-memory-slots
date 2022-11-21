// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StorageTestBytesStrings {
  uint256 a;    // slot 0
  string b;     // slots 1
  string c;    // slot 2

  constructor () {
    a = 1;
    b = "slot2";
    c = "0123456789012345678901234567890123456789" ;
  }
}