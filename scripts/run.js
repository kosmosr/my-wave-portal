const main = async () => {
    // deploy
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1')
    });
    await waveContract.deployed();
    console.log("Contract deployed to:", waveContract.address);

    // get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    // send wave
    let waveTxn = await waveContract.wave("A message #1");
    await waveTxn.wait();

    waveTxn = await waveContract.wave("A message #2");
    await waveTxn.wait();

    // get contract balance after wave
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

    // get all
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
})