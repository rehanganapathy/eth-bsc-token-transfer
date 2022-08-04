const TokenBsc = artifacts.require('/Users/rehanganapathy/Desktop/cross-chain/smart_contracts/TokenBsc.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const tokenBsc = await TokenBsc.deployed();
  const balance = await tokenBsc.balanceOf(recipient);
  console.log(balance.toString());
  done();
}