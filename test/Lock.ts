import { ethers } from "hardhat"

describe("Lock", function () {


  describe("Deployment", function () {
    it.only("Should set the right unlockTime", async function () {
      const [deployer] = await ethers.getSigners()
      const Lock = await ethers.getContractFactory("LanceToken721")
      const lock = await Lock.deploy()
      await lock.deployed()
      await lock.mint(deployer.address, '1000000000000000000')
    })
  })
})
