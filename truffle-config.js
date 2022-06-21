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
        return new HDWalletProvider(process.env.MNEMONIC, "http://127.0.0.1:7545", AccountIndex)
      },
      network_id: "1337"
    },
    ropsten_infura: {
      provider: function() {
        return new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/2b87a1cd9a75478288b5a54b40c62cdc", AccountIndex)
      },
      network_id: "3"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
