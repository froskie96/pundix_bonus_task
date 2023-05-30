import hre from 'hardhat'
import { Config, readConfig, writeConfig } from '../config/config'


async function main() {
  const [deployer] = await hre.ethers.getSigners()
  let config: Config = {}
  if (!hre.network.name) {
    console.error('network is undefined')
    process.exit(1)
  }

  await readConfig(hre.network.name).then((netConfig) => {
    if (netConfig !== undefined) {
      config = netConfig
    }
  }).catch((err: any) => {
    console.error(err)
    process.exit(1)
  })

  if (config.Name === undefined) {
    config.Name = hre.network.name
  }
  if (config.Deployer === undefined) {
    config.Deployer = deployer.address
    writeConfig(config)
  }

  const LanceToken721 = await hre.ethers.getContractFactory('LanceToken721')
  const LanceToken20 = await hre.ethers.getContractFactory('LanceToken20')
  let lanceToken721, lanceToken20

  if (config.LanceToken721 === undefined) {
    console.log('deploying LanceToken721 ... ... ')
    lanceToken721 = await LanceToken721.deploy()
    await lanceToken721.deployed()
    console.log('LanceToken721 deployed to:', lanceToken721.address)
    config.LanceToken721 = lanceToken721.address
    await lanceToken721.mint(deployer.address, '1000000000000000000')
    await lanceToken721.burn('1000000000000000000')
    await lanceToken721.pause()
    writeConfig(config)
  } else {
    lanceToken721 = LanceToken721.attach(config.LanceToken721)
    await lanceToken721.mint(deployer.address, '1000000000000000000')
    await lanceToken721.burn('1000000000000000000')
    await lanceToken721.pause()
  }

  if (config.LanceToken20 === undefined) {
    console.log('deploying LanceToken20 ... ... ')
    lanceToken721 = await LanceToken721.deploy()
    lanceToken20 = await LanceToken20.deploy()
    await lanceToken20.deployed()
    console.log('lanceToken20 deployed to:', lanceToken20.address)
    writeConfig(config)
  } else {
    lanceToken20 = LanceToken20.attach(config.LanceToken20)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})