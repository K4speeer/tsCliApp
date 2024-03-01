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
const etherApp_1 = require("../src/etherApp");
const ethers_1 = require("ethers");
jest.mock('ethers');
describe('EtherApp', () => {
    let etherApp;
    const mockProvider = { getBlockNumber: jest.fn(), balanceOf: jest.fn() };
    const mockContract = { balanceOf: jest.fn() };
    const apiKey = 'testApiKey';
    beforeEach(() => {
        ethers_1.ethers.EtherscanProvider = jest.fn().mockImplementation(() => mockProvider);
        ethers_1.ethers.Contract = jest.fn().mockImplementation(() => mockContract);
        ethers_1.ethers.getDefaultProvider = jest.fn().mockReturnValue(mockProvider);
        ethers_1.ethers.formatUnits = jest.fn().mockReturnValue('formattedBalance');
        etherApp = new etherApp_1.EtherApp(apiKey);
    });
    describe('getBalanceOf', () => {
        it('should return the formatted balance of a given address', () => __awaiter(void 0, void 0, void 0, function* () {
            const testAddress = '0x123';
            mockContract.balanceOf.mockResolvedValue('1000000');
            const balance = yield etherApp.getBalanceOf(testAddress);
            expect(mockContract.balanceOf).toHaveBeenCalledWith(testAddress);
            expect(ethers_1.ethers.formatUnits).toHaveBeenCalledWith('1000000', 6);
            expect(balance).toBe('formattedBalance');
        }));
    });
    describe('getLastBlockNum', () => {
        it('should return the last mined block number', () => __awaiter(void 0, void 0, void 0, function* () {
            mockProvider.getBlockNumber.mockResolvedValue(123456);
            const blockNum = yield etherApp.getLastBlockNum();
            expect(ethers_1.ethers.getDefaultProvider).toHaveBeenCalled();
            expect(mockProvider.getBlockNumber).toHaveBeenCalled();
            expect(blockNum).toBe(123456);
        }));
    });
});
// import { EtherApp } from "../src/etherApp";
// describe('EthersApp', () => {
//   let app: EtherApp;
//   beforeAll(() => {
//     // Adding dummy API key for testing
//     app = new EtherApp('dummyApiKey');
//   });
//   // Testing getBalanceOf function 
//   test('getBalanceOf returns a string', async () => {
//     // Make the balanceOf function to return a fixed value str(1000000)
//     app.usdtContract.balanceOf = jest.fn().mockResolvedValue('1000000') as any;
//     const balance = await app.getBalanceOf('someAddress');
//     expect(typeof balance).toBe('string');
//   });
//   // Testing getLastBlockNum function
//   test('getLastBlockNum returns a number', async () => {
//     // Make the getBlockNumber function to return a fixed value 123456
//     app.provider.getBlockNumber = jest.fn().mockResolvedValue(123456);
//     const blockNum = await app.getLastBlockNum();
//     expect(typeof blockNum).toBe('number');
//   });
// });
//# sourceMappingURL=etherApp.test.js.map