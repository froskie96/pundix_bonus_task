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
  }).catch((err) => {
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
    throw new Error('LanceToken721 is not deployed')
  } else {
    console.log('\nVerifying TestLP', config.LanceToken721)
    lanceToken721 = LanceToken721.attach(config.LanceToken721)
    try {
      await hre.run('verify:verify', {
        address: lanceToken721.address,
        constructorArguments: [
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (config.LanceToken20 === undefined) {
    throw new Error('LanceToken20 is not deployed')
  } else {
    console.log('\nVerifying LanceToken20', config.LanceToken20)
    lanceToken20 = LanceToken20.attach(config.LanceToken20)
    try {
      await hre.run('verify:verify', {
        address: lanceToken20.address,
        contract: 'contracts/LanceToken20.sol:LanceToken20',
        constructorArguments: [
        ],
      })
    } catch (err) {
      console.log(err)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})