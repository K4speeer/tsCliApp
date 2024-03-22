#!/usr/bin/env node

import { EtherApp } from './etherApp';
// import * as apiSetup from './apiSetup';
import { program } from 'commander';
import { config } from 'dotenv';
config()

const apiKey = process.env.ETHERSCAN_API_TOKEN || "";
const app = new EtherApp(apiKey);

program
    .version('0.7.9')
    .description('A CLI tool to get some info from Etherium Blockchain')

// // Set the api at the users endpoint to be able of making requests to the chain 
// program
// .command('set-api-key')
// .description('Saves the API key inside .env file on the users device')
// .action(async () => {
//     //Waitnig for the user to input API Key
//   const apiKey = await apiSetup.promptApiKey();
//   // Sacing the API Key in a .env file
//   await apiSetup.saveApiKeyToEnv(apiKey);
// });

// get-balance <address> commnand
// takes an argument which is the address as a string
// Getting balance of a given account address 
program
    .command('get-balance <address>')
    .description('Returns an USDT balance of given address')
    .action(async (address) => {
        // Cheking if the api key exists and saved in .env file to use 
        // if (!apiSetup.checkApiKeyExists()) {
        //     // Logs an error message
        //     console.error("API key is missing. Please set the API key using 'etheli set-api-key' and try again.");
        // }
        // Getting the balance 
        const balance = await app.getBalanceOf(address);
        if (balance !== undefined) { 
            // Checking if the returned value is not "undefiend"
            console.log(`Balance: ${balance} USDT`);
        }
    });


// etheli get-last-block  
// No arguments required
// Returns the last mined block number in the Ethereum BlockChain 
program
    .command('get-last-block')
    .description('Returns the last mined block number')
    .action(async() => {
        // if (!apiSetup.checkApiKeyExists()) {
        //     console.error("API key is missing. Please set the API key using 'etheli set-api-key' and try again.");
        // }
        const lastBlockNum = await app.getLastBlockNum();
        if (lastBlockNum !== undefined) {
            // Checking if the returned value is not "undefiend" 
            console.log(`Last Block Mined: ${lastBlockNum}`);
        }
    });

program.parse(process.argv);
