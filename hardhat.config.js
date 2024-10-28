require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    //   localhost: {
    //     url: "http://127.0.0.1:8545/",
    //     accounts: [process.env.ADMIN_ACCOUNT_PRIVATE_KEY],
    //   },
    //   amoy: {
    //     url: process.env.AMOY_TESNET_URL,
    //     accounts: [process.env.ADMIN_ACCOUNT_PRIVATE_KEY],
    //     timeout: 0,
    //     gas: "auto",
    //     gasPrice: "auto",
    //   },
    //   sepolia: {
    //     url: process.env.SEPOLIA_TESNET_URL,
    //     accounts: [process.env.ADMIN_ACCOUNT_PRIVATE_KEY],
    //     timeout: 0,
    //     gas: "auto",
    //     gasPrice: "auto",
    //   },
    // },
    // etherscan: {
    //   apiKey: {
    //     sepolia: process.env.ETHERSCAN_API_KEY,
    //     polygonAmoy: process.env.POLYGONSCAN_API_KEY,
    //   },
    //   customChains: [
    //     {
    //       network: "polygonAmoy",
    //       chainId: 80002,
    //       urls: {
    //         apiURL:
    //           "https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy",
    //         browserURL: "https://www.oklink.com/amoy",
    //       },
    //     },
    //   ],
  },
};
