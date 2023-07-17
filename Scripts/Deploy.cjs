const { ethers } = require("hardhat");

async function main() {
  const Getter = await ethers.getContractFactory("Getter");
  const Instance = await Getter.deploy("Good Morning");
  console.log("Contract Deployed At: ", Instance.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error Occurred:", err);
    process.exit(1);
  });
