import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    ropsten: {
      url: 'https://eth-goerli.g.alchemy.com/v2/gxqRS-ab6A_wjrTX4jHd2wt76EhARtrT',
      accounts: [process.env.goerliKey as string],
    },
  },
  etherscan: {
    apiKey: process.env.etherscanKey as string,
  },
}



export default config
