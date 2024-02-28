import {ethers} from 'ethers';
import { config } from 'dotenv';
config()

const apiKey = process.env.etherscanApiToken

const provider = new ethers.EtherscanProvider("homestead", apiKey);
const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const usdtAbi = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "who",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

const usdtContract = new ethers.Contract(usdtContractAddress, usdtAbi, provider);

// USDT Balance function
async function getBalanceOf(address:string) {
    const balance = await usdtContract.balanceOf(address)
    // Convert from wei to usdt
    const balanceInUsdt = ethers.formatUnits(balance, 6);
    
    console.log(`Balance: ${balanceInUsdt} USDT`)
}

// getBalanceOf("0xdac17f958d2ee523a2206206994597c13d831ec7")

// const defaultProvider = ethers.getDefaultProvider();
// Both Default provider and Etherscan provider connects to same node

// Last mined block number function
async function getLastBlockNum(){
    // const defBlockNum = await defaultProvider.getBlockNumber();
    const blocknum = await provider.getBlockNumber();
    // console.log(`BlockNum From Default Provider : ${defBlockNum}`)
    console.log(`Block Number From Etherscan Provider : ${blocknum}`)

}

// getLastBlockNum();