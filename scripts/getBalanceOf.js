const { network, ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
// var BigNumber = require("bignumber.js");
const { Contract, BigNumber, constants, utils } = require("ethers");
const { assert, util } = require("chai");
require("dotenv").config();

async function getBalanceOf() {
  let RPC_URL, wallet, nonce1, keyWallet;
  // Get the accounts and chainId for local test
  const accounts = await ethers.getSigners();
  const chainId = network.config.chainId;
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  if (chainId == 31337) {
    wallet = accounts[0];
    console.log("testnet Detected");
  } else {
    console.log("Main Chain Detected");
    keyWallet = process.env.PRIVATE_KEY_Deployer;
    wallet = new ethers.Wallet(keyWallet, provider);
  }

  /// Contract Section ///
  nonce1 = await provider.getTransactionCount(wallet.address);
  const erc404Contract = await ethers.getContract("ronin", wallet);

  let user, get, address;

  address = "";

  get = await erc404Contract.balanceOf(address);

  console.log(`Balance of Checked Address ${address}`, get.toString() / 1e18);

  console.log("Script Ended!");
}

getBalanceOf()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = {
  getBalanceOf
};
