require("dotenv").config({path: "../.env"});
const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KycContract");
const chai = require("./setupChai.js"); 
const BigNumber = web3.utils.BN;
const expect = chai.expect;

contract ("TokenSale Test", async (accounts) => {
    const [ deployerAccount, recipient, anotherAccount ] = accounts;

    it("should not have any tokens in my deployerAccount", async() => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BigNumber(0));
    }); 

    it("the initial token supply must be the one defined at env file", async() => {
        let instance = await MyToken.deployed();
        let totalSupply = new BigNumber(await instance.totalSupply());
        return expect(new BigNumber(process.env.INITIAL_TOKENS)).to.be.a.bignumber.equal(totalSupply);
    }); 

    it("all tokens must be in the token sale contract", async() => {
        let instance = await MyToken.deployed();
        let instanceTokenSale = await MyTokenSale.deployed();
        let totalSupply = new BigNumber(await instance.totalSupply());
        let balanceTokenSale = await instance.balanceOf(instanceTokenSale.address);
        return expect(balanceTokenSale).to.be.a.bignumber.equal(totalSupply);
    });

    it("the _rate on MyCrowdSale must be the rate_to_wei defined at env file", async() => {
        let instance = await MyTokenSale.deployed();
        let rate = await instance.getRate();
        return expect(process.env.RATE_TO_WEI).to.be.a.bignumber.equal(rate);
    });

    it("should be possible to buy tokens (course version)", async() => {
        let weiSent = new BigNumber(100);
        let tokenReceived = new BigNumber(weiSent * process.env.RATE_TO_WEI);
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);

        //does not work without await...
        await expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei(weiSent, "wei")})).to.be.fulfilled;
       
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.bignumber.equal(balanceBefore.add(tokenReceived));
    })

    it("should be possible to buy tokens (my version)", async() => {
        const weiAmountToSend = new BigNumber(1000);
        const tokenAmountSent = new BigNumber (weiAmountToSend * process.env.RATE_TO_WEI);
        let kycInstance = await KycContract.deployed();
        //add anotherAccount in the whitelist
        await kycInstance.setKycWhitelisted(anotherAccount, {from: deployerAccount});
        let instance = await MyToken.deployed();
        let instanceTokenSale = await MyTokenSale.deployed();
        let initialTokenBalance = await instance.balanceOf(instanceTokenSale.address);
        //increased gas limit to avoid 'out of gas' problem
        await web3.eth.sendTransaction({from: anotherAccount, to: instanceTokenSale.address, value: weiAmountToSend, gas: 1000000 }, async function(error, result) {
            if(result){
                expect(instance.balanceOf(anotherAccount)).to.eventually.be.a.bignumber.equal(tokenAmountSent);
                expect(instance.balanceOf(instanceTokenSale.address)).to.eventually.be.a.bignumber.equal(new BigNumber(initialTokenBalance - tokenAmountSent));
            } else {
                throw error;
            }
        });
    })


}) 

