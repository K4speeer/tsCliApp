#!/usr/bin/env node

import {ethers} from 'ethers';
import { program } from 'commander';
import { config } from 'dotenv';
config()

const apiKey = process.env.etherscanApiToken

// Creating Contract instance with desired functionality (USDT balance getter)
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

program
    .version('0.0.1')
    .description('A CLI tool to get some info from Etherium Blockchain')

program
    .command('get-balance <address>')
    .description('Returns an USDT balance of given address')
    .action(async (address) => {
        await getBalanceOf(address);
    });

program
    .command('get-last-block')
    .description('Returns the last mined block number')
    .action(async() => {
        await getLastBlockNum();
    });

program.parse(process.argv);
