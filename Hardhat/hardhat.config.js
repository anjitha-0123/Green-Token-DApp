require("dotenv").config()

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  defaultNetwork:"sepolia",
  solidity: "0.8.30",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/"
    },
    sepolia:{
      url:`https://eth-sepolia.g.alchemy.com/v2/${process.env.Sepolia_Key}`,
      accounts:[process.env.Private_Key]
    }
  }
};
