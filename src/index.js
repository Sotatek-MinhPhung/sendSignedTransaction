const Web3 = require('web3')

const rinkeby_infura_url = "https://rinkeby.infura.io/v3/e180608a18e74c5397b40e760f7a31f7"

const account1 = {
    ADDRESS: "0xA853531E6bd0129c9389738E8F00603619e15fE2",
    PRIVATE_KEY: "36d712be341d6564d24e3844e698c4269eb8302fafadcb13957dbe249e1737d5"
}
const account2 = {
    ADDRESS: "0x1002271d02E8a72aA642855A56394791fb3cb46D",
    PRIVATE_KEY: "4bbacdc2bf6caba90e22399f0f6c77d876727c7999e98b3b9031a8a1b6ffab1b"
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