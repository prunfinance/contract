const fs = require('fs');
const hre = require('hardhat');
const ethers = hre.ethers;

async function main() {
    // Loading accounts
    const accounts = await ethers.getSigners();

    console.log('=====================================================================================');
    console.log('ACCOUNTS:');
    console.log('=====================================================================================');
    for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        console.log(` Account ${i}: ${account.address}`);
    }

    // Loading contract factory
    const TokenPUN = await ethers.getContractFactory('PRUN');
    const TokenPEN = await ethers.getContractFactory('PREN');
    const Random = await ethers.getContractFactory('Random');
    const Firepit = await ethers.getContractFactory('FirePit');

    const [deployer] = await ethers.getSigners();

    console.log('=====================================================================================');
    console.log(`DEPLOYED CONTRACT ADDRESS TO:  ${hre.network.name}`);
    console.log('=====================================================================================');

    const tokenPEN = await TokenPEN.deploy();
    await tokenPEN.deployed();
    console.log(' TokenPEN         deployed to:', tokenPEN.address);


    const random = await Random.deploy();
    await random.deployed();
    console.log(' Random         deployed to:', random.address);


    const firepit = await Firepit.deploy();
    await firepit.deployed();
    console.log(' Firepit         deployed to:', firepit.address);

    const tokenPUN = await TokenPUN.deploy(tokenPEN.address, firepit.address, random.address);
    await tokenPUN.deployed();
    console.log(' TokenPUN         deployed to:', tokenPUN.address);
    
    console.log("=============== SETTING FOR CONTRACT ===============");

    let tx = await tokenPEN.setVault(tokenPUN.address);
    await tx.wait();
    console.log("set vault to mint or burn token for PUN contract");

    tx = await tokenPEN.initialize();
    await tx.wait();
    console.log("initialize supply token for owner");

    tx = await tokenPEN.renounceOwnership();
    await tx.wait();
    console.log("renounce owner to address 0x0");

    tx = await firepit.setToken(tokenPUN.address);
    await tx.wait();
    console.log("set token Pun for Firepit")
  
    // export deployed contracts to json (using for front-end)
    const contractAddresses = {
        "TokenPUN": tokenPUN.address,
        "TokenPEN": tokenPEN.address,
        "Random": random.address,
        "Firepit": firepit.address
    }
    await fs.writeFileSync("contracts.json", JSON.stringify(contractAddresses));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });