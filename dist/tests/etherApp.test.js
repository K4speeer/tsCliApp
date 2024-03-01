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
const etherApp_1 = require("../src/etherApp");
jest.mock('ethers', () => {
    return {
        ethers: {
            EtherscanProvider: jest.fn().mockImplementation(() => ({
                getBlockNumber: jest.fn().mockResolvedValue(123456),
            })),
            Contract: jest.fn().mockImplementation(() => ({
                balanceOf: jest.fn().mockResolvedValue('1000000000000000000'), // 1 USDT in wei for simplicity
            })),
            formatUnits: jest.fn().mockReturnValue('1.0'), // Mocking conversion to return 1 USDT for simplicity
        },
    };
});
describe('EtherApp', () => {
    let etherApp;
    const apiKey = 'testApiKey';
    beforeEach(() => {
        // Initialize EtherApp before each test
        etherApp = new etherApp_1.EtherApp(apiKey);
    });
    describe('getBalanceOf', () => {
        it('should return the balance of a given address', () => __awaiter(void 0, void 0, void 0, function* () {
            const address = '0xdac17f958d2ee523a2206206994597c13d831ec7';
            const balance = yield etherApp.getBalanceOf(address);
            expect(balance).toBe('1.0'); // Expecting 1 USDT as mocked
            expect(ethers_1.ethers.Contract.prototype.balanceOf).toHaveBeenCalledWith(address);
        }));
    });
    describe('getLastBlockNum', () => {
        it('should return the last mined block number', () => __awaiter(void 0, void 0, void 0, function* () {
            const blockNumber = yield etherApp.getLastBlockNum();
            expect(blockNumber).toBe(123456); // Expecting mocked block number
            expect(ethers_1.ethers.EtherscanProvider.prototype.getBlockNumber).toHaveBeenCalled();
        }));
    });
});
//# sourceMappingURL=etherApp.test.js.map