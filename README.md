# TokenizationLab

Blockchain Dapp Prototype - Tokenization Lab - Third Lab of the course https://www.udemy.com/course/blockchain-developer/

Description: A Token creation and sale dapp with mintable tokens (unfixed supply) and whitelist approval by the deployer

Requirements: Truffle, react, node, ganache, infura, dotenv

Create an .env file with the following variables:
INITIAL_TOKENS=1000000000 (used only by fixed_supply version)
RATE_TO_WEI=1
MNEMONIC=your mnemonic phrase
INFURA_ROPSTEN_URL=your infura ropsten url
INFURA_GOERLI_URL=your infura goerli url

How to deploy and run on ganache: 
-> start ganache.
-> run truffle tests: truffle test --network ganache
-> migrate smart contracts to Ganache: truffle migrate --reset --network ganache
-> in client folder: run start
-> add your local ganache network on metamask and connect to it 
-> change account on metamask to your deploy account (mnemonic informed on .env)

How to deploy and run on testnet ropsten using infura: 
-> create a project in Infura, copy address of ropsten and goerli urls and paste it on .env file
-> run truffle tests: truffle test --network ropsten_infura
-> migrate smart contracts to Ropsten testnet: truffle migrate --reset --network ropsten_infura
-> in client folder: run start 
-> change metamask network to Ropsten and connect to it 
-> change account on metamask to your deploy account (mnemonic informed on .env)





