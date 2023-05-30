import "@nomicfoundation/hardhat-toolbox"
import 'dotenv/config'
import { HardhatUserConfig } from 'hardhat/config'

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/gxqRS-ab6A_wjrTX4jHd2wt76EhARtrT',
      accounts: [process.env.controlKey as string],
    },
  },
  etherscan: {
    apiKey: process.env.etherscanKey as string,
  },
}



export default config
