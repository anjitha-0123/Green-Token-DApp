const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers');
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GreenToken', () => {
  async function deployGreenTokenFixture() {
    const [admin, other] = await ethers.getSigners();
    const GreenToken = await ethers.getContractFactory('GreenToken');

    // ✅ Pass admin.address to constructor as initialOwner
    const greenToken = await GreenToken.deploy(admin.address);

    return { admin, greenToken };
  }

  it('should deploy the contract from the admin account', async () => {
    const { admin, greenToken } = await loadFixture(deployGreenTokenFixture);  

    expect(greenToken.deploymentTransaction().from).to.equal(admin.address);
  });
});
