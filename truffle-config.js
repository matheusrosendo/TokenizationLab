const path = require("path");
require("dotenv").config({path: "./.env"});
const HDWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    ganache_default_accounts: {
      host: "localhost",
      port: 7545,
      network_id: "1337"
    },
    ganache: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC_LOCALDEV_ACCOUNT, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: "1337"
    },
    goerli_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC_TESTNET_ACCOUNT, process.env.INFURA_GOERLI_URL, AccountIndex)
      },
      network_id: "5"
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC_TESTNET_ACCOUNT, process.env.INFURA_ROPSTEN_URL, AccountIndex)
      },
      network_id: "3"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }, 
  mocha: {
      enableTimeouts: false,
      before_timeout: 240000 // Here is 4min but can be whatever timeout is suitable for you.
  }
};
