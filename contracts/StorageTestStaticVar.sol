// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StorageTestStaticVar {
    uint8 private a = 7; //0
    uint16 private b =10; //0
    address public c = 0xbE03bCA4D65A86114668697867982Ecfc76f15F8; //0  //160 bits
    bool public d = true; //0
    uint64 public e = 15; //0
    uint256 public f = 200; //1
    uint8 public g = 40; //2
    uint256 public h = 789; //3
}