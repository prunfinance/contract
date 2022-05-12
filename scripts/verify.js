const hre = require('hardhat');
const contract = require('../contracts.json');

/// Discription : Verification source script
/// Prerequisite: Adding VERIFY_KEY value in `.env` file
/// How to use  : Run below command
///               cmd$> npx hardhat run scripts/verify.js --network <your-network>

async function main() {
  const VERIFY_KEY = process.env.VERIFY_KEY;
  
  console.log('=====================================================================================');
  console.log('VERIFY_KEY:', VERIFY_KEY);
  console.log('=====================================================================================');

  console.log('Verify TokenPUN');
  try {
    await hre.run("verify:verify", {
      address: contract.TokenPUN,
      constructorArguments: [contract.TokenPEN, contract.Firepit, contract.Random],
      contract: "contracts/pun.sol:PRUN"
    });
  } catch (e) {
    console.log(e.message);
  }

  console.log('Verify TokenPEN');
  try {
    await hre.run("verify:verify", {
      address: contract.TokenPEN,
      constructorArguments: [],
      contract: "contracts/pen.sol:PREN"
    });
  } catch (e) {
    console.log(e.message);
  }

  console.log('Verify FirePit');
  try {
    await hre.run("verify:verify", {
      address: contract.FirePit,
      constructorArguments: [],
      contract: "contracts/firepit.sol:FirePit"
    });
  } catch (e) {
    console.log(e.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });