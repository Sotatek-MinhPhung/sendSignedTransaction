const Web3 = require('web3')

const MyContract = require("../src/abis/MyContract.json")
const rinkeby_infura_url = "https://rinkeby.infura.io/v3/e180608a18e74c5397b40e760f7a31f7"


const address = "0xA853531E6bd0129c9389738E8F00603619e15fE2"
const privateKey = "36d712be341d6564d24e3844e698c4269eb8302fafadcb13957dbe249e1737d5"

const init = async () => {
    const web3 = new Web3(rinkeby_infura_url);
    const networkId = await web3.eth.net.getId();
    const myContract = new web3.eth.Contract(
        MyContract.abi,
        MyContract.networks[networkId].address
    );

    const tx = myContract.methods.setData(1);
    const gas = await tx.estimateGas({from: address});
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: myContract.options.address,
            data,
            gas,
            gasPrice,
            nonce,
            chainId: networkId
        },
        privateKey
    );
    console.log(`Old data value: ${await myContract.methods.data().call()}`);

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`New data value: ${await myContract.methods.data().call()}`);
}

init()