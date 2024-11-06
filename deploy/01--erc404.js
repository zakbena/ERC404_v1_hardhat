const { network, ethers } = require("hardhat");
const { external } = require("../hardhat.config");
const { verify } = require("../utils/verify");

const _env = process.env;
const provider = new ethers.providers.JsonRpcProvider(_env.RPC_URL);

module.exports = async ({ getNamedAccounts, deployments }) => {
  let WETH;
  const { deploy, log } = deployments;

  const accounts = await ethers.getSigners();
  const { deployers } = accounts[0];
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  let owner;
  if (chainId == 31337) {
    owner = deployer;
  } else {
    owner = deployer;
  }

  args = [owner];
  // ERC404
  const token = await deploy("ERC404", {
    contract: "ERC404",
    from: deployer,
    log: true,
    args: args
    // gasLimit: 1605000
  });

  // // To uncomment to verify the contract in ase of final deployment
  // // if (!developmentChains.includes(network.name)) {
  // log("Verifying...");
  // await verify(token.address, args);
  // }
};

module.exports.tags = ["all", "token"];
