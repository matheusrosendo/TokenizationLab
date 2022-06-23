var MyToken = artifacts.require("MyToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var KycContract = artifacts.require("KycContract");
require("dotenv").config({path: "../.env"});

module.exports = async function(deployer){
    const maxSupply = process.env.INITIAL_TOKENS;
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(KycContract);
    let kycInstance = await KycContract.deployed();
    //add the deployer address to the whitelist
    await kycInstance.setKycWhitelisted(addr[0], {from: addr[0]});
    await deployer.deploy(MyToken, maxSupply);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, maxSupply);
    
}
