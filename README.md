# TokenizationLabFixedSupply

Blockchain Dapp Prototype - Tokenization Lab - Third Lab of the course https://www.udemy.com/course/blockchain-developer/

Description: A Token creation and sale dapp with fixed supply and whitelist approval by the deployer

Live testnet: https://matheusrosendo.github.io/TokenizationLabFixedSupply

Requirements: Infura project creation (https://infura.io), ganache instalation, node package manager installation

Prerequisites:
> Clone this repository: git clone
> Install dependencies going to main folder of the project using powershell and typing: npm install
> do the same in the client folder: npm install

Create an .env file with the following variables:
INITIAL_TOKENS=1000000000
RATE_TO_WEI=1
MNEMONIC_LOCALDEV_ACCOUNT=your mnemonic phrase (take from the first account (show keys) of your ganache instance)
MNEMONIC_TESTNET_ACCOUNT= your mnemonic phrase - create or use one and take some faucets of eth goerli and/or eth ropsten according to the network you are going to deploy
INFURA_ROPSTEN_URL=your infura ropsten url
INFURA_GOERLI_URL=your infura goerli url

How to deploy and run on ganache: 
> start ganache.
> run truffle tests: truffle test --network ganache
> migrate smart contracts to Ganache: truffle migrate --reset --network ganache
> in client folder: npm start
> add your local ganache network on metamask and connect to it 
> change account on metamask to your deploy account (mnemonic informed on .env)
> refresh page (default is localhost:3000)

How to deploy and run on testnet ropsten using infura: 
> create a project in Infura, copy address of ropsten and goerli urls and paste it on .env file
> run truffle tests: truffle test --network ropsten_infura
> migrate smart contracts to Ropsten testnet: truffle migrate --reset --network ropsten_infura
> in client folder: npm start 
> change metamask network to Ropsten and connect to it 
> change account on metamask to your deploy account (mnemonic informed on .env)





