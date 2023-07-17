/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: "0.8.19",
  networks:{
    hardhat:{
      chainId:1337
    }
  },
  paths:{
    artifacts:"./src/Artifacts"
  }
};
