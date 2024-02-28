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
const ethers_1 = require("ethers");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const apiKey = process.env.etherscanApiToken;
const provider = new ethers_1.ethers.EtherscanProvider("homestead", apiKey);
const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
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
];
const usdtContract = new ethers_1.ethers.Contract(usdtContractAddress, usdtAbi, provider);
// USDT Balance function
function getBalanceOf(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const balance = yield usdtContract.balanceOf(address);
        // Convert from wei to usdt
        const balanceInUsdt = ethers_1.ethers.formatUnits(balance, 6);
        console.log(`Balance: ${balanceInUsdt} USDT`);
    });
}
// getBalanceOf("0xdac17f958d2ee523a2206206994597c13d831ec7")
// const defaultProvider = ethers.getDefaultProvider();
// Both Default provider and Etherscan provider connects to same node
// Last mined block number function
function getLastBlockNum() {
    return __awaiter(this, void 0, void 0, function* () {
        // const defBlockNum = await defaultProvider.getBlockNumber();
        const blocknum = yield provider.getBlockNumber();
        // console.log(`BlockNum From Default Provider : ${defBlockNum}`)
        console.log(`Block Number From Etherscan Provider : ${blocknum}`);
    });
}
// getLastBlockNum();
//# sourceMappingURL=main.js.map