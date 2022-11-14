// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract StorageTestStaticVar {
    uint8 public a = 7; //0
    uint16 public b =10; //0
    address public d = 0xbE03bCA4D65A86114668697867982Ecfc76f15F8; //0  //160 bits
    bool public bb = true; //0
    uint64 public c = 15; //0
    uint256 public e = 200; //1
    uint8 public f = 40; //2
    uint256 public g = 789; //3
}