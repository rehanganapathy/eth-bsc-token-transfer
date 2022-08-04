# eth-bsc-token-transfer
A transfer token mechanism from the ethereum network to binance smart chain, this is done by using a bridge, which first burns the tokens on the sending chain and then mints them on the receiving chain.

A basic mechanism of it works is shown below.

<img width="711" alt="Screenshot 2022-07-28 at 10 38 19" src="https://user-images.githubusercontent.com/79349712/182872362-0894655f-55dd-4c05-8cb3-0357d22687b7.png">


keep ganache running for this to work, make sure the naming on your migrations folder is correct, they dont work if you name your folders anything else
Use your own infura url(wsl link) and mnemonic in your truffle config file, your contract cannot deploy without these two.
Also make sure your imports are right, i have removed mine here to replace it with an abstract
