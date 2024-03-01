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
exports.EtherApp = void 0;
const ethers_1 = require("ethers");
class EtherApp {
    // Creating constructor  
    constructor(apiKey) {
        // Creating Contract instance with desired functionality (USDT balance getter)
        this.provider = new ethers_1.ethers.EtherscanProvider("homestead", apiKey);
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
        this.usdtContract = new ethers_1.ethers.Contract(usdtContractAddress, usdtAbi, this.provider);
    }
    // USDT Balance function
    getBalanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.usdtContract.balanceOf(address);
            // Convert from wei to usdt
            return ethers_1.ethers.formatUnits(balance, 6);
        });
    }
    // Last mined block number function
    getLastBlockNum() {
        return __awaiter(this, void 0, void 0, function* () {
            // const blocknum = await this.provider.getBlockNumber();
            // console.log(`BlockNum Using Default Provider : ${defBlockNum}`)
            // console.log(`Last Block Mined Using Etherscan Provider : ${blocknum}`)
            return yield ethers_1.ethers.getDefaultProvider().getBlockNumber();
        });
    }
}
exports.EtherApp = EtherApp;
// getBalanceOf("0xdac17f958d2ee523a2206206994597c13d831ec7")
// getLastBlockNum();
//# sourceMappingURL=etherApp.js.map