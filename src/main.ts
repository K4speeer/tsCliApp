#!/usr/bin/env node

import { EtherApp } from './etherApp';
import { program } from 'commander';
import { config } from 'dotenv';
config()

const apiKey = process.env.etherscanApiToken || "";
const app = new EtherApp(apiKey);

program
    .version('0.0.1')
    .description('A CLI tool to get some info from Etherium Blockchain')

program
    .command('get-balance <address>')
    .description('Returns an USDT balance of given address')
    .action(async (address) => {
        console.log(`Balance: ${await app.getLastBlockNum()} USDT`);
    });

program
    .command('get-last-block')
    .description('Returns the last mined block number')
    .action(async() => {
       console.log(`Last Block Mined Using Etherscan Provider: ${await app.getLastBlockNum()}`);
    });

program.parse(process.argv);
