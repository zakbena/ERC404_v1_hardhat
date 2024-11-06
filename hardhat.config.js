require("@nomiclabs/hardhat-waffle");
// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
require("@nomicfoundation/hardhat-network-helpers");
// require("@nomiclabs/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
const RPC_URL = process.env.RPC_URL;
const PRIVATE_DEPLOYER = process.env.PRIVATE_KEY_Deployer;
const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY;
const CMC_API = process.env.CMC;
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24"
      }
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },

  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "https://ethereum-sepolia.publicnode.com",
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 11155111,
      BlockConfirmations: 2
    },
    metisSep: {
      url: `${RPC_URL}`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 59901,
      BlockConfirmations: 2
    },
    arbi: {
      url: `${RPC_URL}`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 42161,
      BlockConfirmations: 2
    },
    arbiGoerli: {
      url: `${RPC_URL}`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 421613,
      BlockConfirmations: 2
    },
    goerliMetis: {
      url: `${RPC_URL}`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 599,
      BlockConfirmations: 2
    },
    testbinance: {
      url: `${RPC_URL}`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 97,
      BlockConfirmations: 6
    },
    fuji: {
      url: "https://rpc.ankr.com/avalanche_fuji",
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 43113,
      BlockConfirmations: 6
    },
    goerli: {
      url: `https://ethereum-goerli.publicnode.com`,
      accounts: [`${PRIVATE_DEPLOYER}`],
      chainId: 5,
      BlockConfirmations: 6
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
      allowUnlimitedContractSize: true,
      mining: {
        auto: false,
        interval: 30
      },
      blockGasLimit: 100000000
    }
  },
  etherscan: {
    apiKey: `${ETHERSCAN_API}`
  },
  gasReporter: {
    enabled: true,
    outputFile: "gas-report.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: CMC_API,
    // Token permit to specify the chain, default is eth
    token: "eth"
  },
  namedAccounts: {
    deployer: {
      default: 0
      // 5: 0,
    },
    first: {
      default: 1
      // 5: 0,
    }
  },
  mocha: {
    timeout: 20000
  },

  external: {
    contracts: [
      {
        artifacts: "node_modules/@uniswap/v2-core/build"
      },
      {
        artifacts: "node_modules/@uniswap/v2-periphery/build"
      }
    ],

    deployments: "deploy"
  }
};
