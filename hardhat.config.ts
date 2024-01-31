import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"
dotenv.config();
const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY: string = process.env.PRIVATE_KEY!;
const ETHERSCAN_API_KEY: string = process.env.ETHERSCAN_API_KEY!;
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
