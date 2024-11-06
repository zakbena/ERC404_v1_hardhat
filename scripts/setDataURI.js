const { network, ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");
// var BigNumber = require("bignumber.js");
const { Contract, BigNumber, constants, utils } = require("ethers");
const { assert, util } = require("chai");
require("dotenv").config();

async function setTokenURI() {
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
  const erc404Contract = await ethers.getContract("", wallet);

  let setTx, get, uri;

  // Set the URL, recheck the URL to be sure no errors
  uri = "";

  setTx = await erc404Contract.setDataURI(uri);

  await setTx.wait().then(async (receipt) => {
    if (receipt && receipt.status == 1) {
      console.log("Data URI", await erc404Contract.dataURI());
    } else {
    }
  });

  console.log("Script Ended!");
}

setTokenURI()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = {
  setTokenURI
};
