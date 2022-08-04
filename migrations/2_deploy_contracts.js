const TokenEth = artifacts.require('TokenEth');
const TokenBsc = artifacts.require('TokenBsc');
const BridgeEth = artifacts.require('BridgeEth');
const BridgeBsc = artifacts.require('BridgeBsc');

module.exports = async function (deployer, network, addresses) {
  if(network === 'ethTestnet') {
    await deployer.deploy(TokenEth);
    const tokenEth = await TokenEth.deployed();
    await tokenEth.mint(addresses[0], 100000000);
    await deployer.deploy(BridgeEth, tokenEth.address);
    const bridgeEth = await BridgeEth.deployed();
    await tokenEth.updateAdmin(bridgeEth.address);
  }
  if(network === 'bscTestnet') {
    await deployer.deploy(TokenBsc);
    const tokenBsc = await TokenBsc.deployed();
    await deployer.deploy(BridgeBsc, tokenBsc.address);
    const bridgeBsc = await BridgeBsc.deployed();
    await tokenBsc.updateAdmin(bridgeBsc.address);
  }
};