const Web3 = require('web3');
const BridgeEth = require('/Users/rehanganapathy/Desktop/cross-chain/smart_contracts/BridgeEth.sol');
const BridgeBsc = require('/Users/rehanganapathy/Desktop/cross-chain/smart_contracts/BridgeBsc.sol');

const web3Eth = new Web3('wss://rinkeby.infura.io/ws/v3/b17f680117f64bd79f549fded1907a1d');
const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const adminPrivKey = '';
const { address: admin } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(
  BridgeEth.abi,
  BridgeEth.networks['4'].address
);

const bridgeBsc = new web3Bsc.eth.Contract(
  BridgeBsc.abi,
  BridgeBsc.networks['97'].address
);

bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)
.on('data', async event => {
  const { from, to, amount, date, nonce } = event.returnValues;

  const tx = bridgeBsc.methods.mint(to, amount, nonce);
  const [gasPrice, gasCost] = await Promise.all([
    web3Bsc.eth.getGasPrice(),
    tx.estimateGas({from: admin}),
  ]);
  const data = tx.encodeABI();
  const txData = {
    from: admin,
    to: bridgeBsc.options.address,
    data,
    gas: gasCost,
    gasPrice
  };
  const receipt = await web3Bsc.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
  `);
});