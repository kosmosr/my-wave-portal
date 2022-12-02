const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    await waveContract.getTotalWaves();

    const wallets = [owner, randomPerson];
    for (const wallet of wallets) {
        let waveTxn = await waveContract.connect(wallet).wave();
        await waveTxn.wait();
    }
    await waveContract.getTotalWaves();
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})