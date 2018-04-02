# Truffle fast compile

Wrapper for [solc binary package](http://solidity.readthedocs.io/en/develop/installing-solidity.html#binary-packages)

## Problem

Compiling complex smart contract via `truffle compile` command is [very slow](ttps://medium.com/@viktornosov/truffle-compile-so-slow-solc-is-much-faster-2acfb7004bbe)

When we use [truffle framework](http://truffleframework.com/) and compile ethereum solidity 
smart contracts with `truffle compile` command, 
actually we use [javascript version](https://github.com/ethereum/solc-js) 
of solidity compiler.
But solidity compiler works very slow, for instance compiling of ~20 .sol files 
takes about 2 minutes


## Solution 

Simple solution is to use solc binary package, that works much faster. You can install this package by commands:

`sudo add-apt-repository ppa:ethereum/ethereum`

`sudo apt-get update`

`sudo apt-get install solc`



This package provides wrapper for `solc` command

## Installation

`npm i -g truffle-fast-compile`

## Usage 

`truffle-fast-compile ./contracts/MyContract.sol`

