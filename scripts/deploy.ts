import { ethers } from "hardhat";

async function main() {
  const initialMessage: string = "Hello world! my name is Zarah... I am a blockchain engineer, leveraging on the ergonimics rust provides to contribute to the ethereum community"

  const lock = await ethers.deployContract("Message", [initialMessage], {
  });

  await lock.waitForDeployment();

  console.log(
    `Contract deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
