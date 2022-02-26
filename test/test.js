const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
    it("deploy & mint 1 w/o _setTokenURI", async function () {
        const MyEpicNFT = await ethers.getContractFactory("MyEpicNFT");
        const contract = await MyEpicNFT.deploy();

        let currSupply = await contract.currentSupply();
        currSupply = currSupply.toNumber();
        expect(currSupply).to.equal(0);

        const tx = await contract.mint(1);
        await tx.wait();

        currSupply = await contract.currentSupply();
        currSupply = currSupply.toNumber();
        expect(currSupply).to.equal(1);
    });
    it("deploy & mint 1 with _setTokenURI", async function () {
        const MyEpicNFTv2 = await ethers.getContractFactory("MyEpicNFTv2");
        const contract = await MyEpicNFTv2.deploy();

        let currSupply = await contract.currentSupply();
        currSupply = currSupply.toNumber();
        expect(currSupply).to.equal(0);

        const tx = await contract.mint(1);
        await tx.wait();

        currSupply = await contract.currentSupply();
        currSupply = currSupply.toNumber();
        expect(currSupply).to.equal(1);
    });
});
