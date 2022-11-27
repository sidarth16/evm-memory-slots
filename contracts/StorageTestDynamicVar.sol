// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


contract StorageTestDynamicVar {
  uint256 public a;     // slot 0
  uint256[3] b;         // slots 1-2-3

  struct Entry {
    uint256 id;
    uint256 value;
  }
  Entry c;       // slots 4-5
  uint256[] d;   // slot 6
  Entry[] e;     // slot 7

  constructor() {
    a = 0;
    b = [1,2,3];
    c = Entry(4, 5);

    d.push(6);
    d.push(7);
    d.push(8);
    e.push(Entry(9, 10));
  }
}