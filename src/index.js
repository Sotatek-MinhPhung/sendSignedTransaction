const Web3 = require('web3')

const rinkeby_infura_url = "https://rinkeby.infura.io/v3/e180608a18e74c5397b40e760f7a31f7"

const account1 = {
    ADDRESS: "",
    PRIVATE_KEY: ""
}
const account2 = {
    ADDRESS: "",
    PRIVATE_KEY: ""
}

const sendEth = async (address, privateKey, address2, value) => {
    const web3 = new Web3(rinkeby_infura_url);
    const gasPrice = await web3.eth.getGasPrice();
    const nonce = await web3.eth.getTransactionCount(address);

    const txData = {
        to: address2,
        value: web3.utils.toWei(value.toString(),'ether'),
        gas: 21000,
        gasPrice,
        nonce,
    }

    const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

sendEth(account1.ADDRESS, account1.PRIVATE_KEY, account2.ADDRESS, 1)
