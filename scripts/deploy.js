const main = async () => {
    /*const [owner] = await hre.ethers.getSigners();
    const accountBalance = await owner.getBalance();

    console.log("Deploying contracts with the account: ", owner.address);
    console.log("Account balance: ", accountBalance.toString());*/

    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.001")
    });
    await waveContract.deployed();

    console.log("WavePortal address: ", waveContract.address);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})