#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const etherApp_1 = require("./etherApp");
const commander_1 = require("commander");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.etherscanApiToken || "";
const app = new etherApp_1.EtherApp(apiKey);
commander_1.program
    .version('0.0.1')
    .description('A CLI tool to get some info from Etherium Blockchain');
commander_1.program
    .command('get-balance <address>')
    .description('Returns an USDT balance of given address')
    .action((address) => __awaiter(void 0, void 0, void 0, function* () {
    yield app.getBalanceOf(address);
}));
commander_1.program
    .command('get-last-block')
    .description('Returns the last mined block number')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield app.getLastBlockNum();
}));
commander_1.program.parse(process.argv);
//# sourceMappingURL=main.js.map