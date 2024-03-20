#!/usr/bin/env node

import { EtherApp } from './etherApp';
import {promptApiKey, saveApiKeyToEnv} from './apiSetup';
import { program } from 'commander';
import { config } from 'dotenv';
config()

const apiKey = process.env.ETHERSCAN_API_TOKEN || "";
const app = new EtherApp(apiKey);

program
    .version('0.7.8')
    .description('A CLI tool to get some info from Etherium Blockchain')


program
.command('set-api-key')
.description('Saves the API key in the .env file')
.action(async () => {
  const apiKey = await promptApiKey();
  await saveApiKeyToEnv(apiKey);
});

program
    .command('get-balance <address>')
    .description('Returns an USDT balance of given address')
    .action(async (address) => {
        const balance = await app.getBalanceOf(address);
        if (balance !== undefined) { 
            console.log(`Balance: ${balance} USDT`);
        }
    });

program
    .command('get-last-block')
    .description('Returns the last mined block number')
    .action(async() => {
        const lastBlockNum = await app.getLastBlockNum();
        if (lastBlockNum !== undefined) { 
            console.log(`Last Block Mined: ${lastBlockNum}`);
        }
    });

program.parse(process.argv);
