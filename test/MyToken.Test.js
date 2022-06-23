require("dotenv").config({path: "../.env"});
const Token = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");

const chai = require("./setupChai.js"); 
const BigNumber = web3.utils.BN;
const expect = chai.expect;

contract ("Token Test", async (accounts) => {
    const [ initialHolder, recipient, anotherAccount ] = accounts;
    
    //call before each test unit, it can redeploy de contract
    beforeEach( async() => {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS);
    })

    it("all tokens should be in myTokenSale account", async() => {
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        //first way to do it
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "Balance was not the same")
        
        //second way, without using chai
        //expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);

        //third way using chai as promisse
        return await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("I can send tokens from Account 1 to Account 2", async () => {
        const sendTokens = 1;
        let instance = await this.myToken;
        let totalSupply = await instance.totalSupply();
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;      
        await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BigNumber(sendTokens)));
        return await expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BigNumber(sendTokens));
    });


    it("It's not possible to send more tokens than account 1 has", async () => {
        let instance = await this.myToken;
        let balanceOfAccount = await instance.balanceOf(initialHolder);
        await expect(instance.transfer(recipient, new BigNumber(balanceOfAccount+1))).to.eventually.be.rejected;

        //check if the balance is still the same
        return await expect(instance.balanceOf(initialHolder)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });

})

