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
describe('EthersApp', () => {
    let app;
    beforeAll(() => {
        // Adding dummy API key for testing
        app = new etherApp_1.EtherApp('dummyApiKey');
    });
    // Testing getBalanceOf function 
    test('getBalanceOf returns a string', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make the balanceOf function to return a fixed value str(1000000)
        app.usdtContract.balanceOf = jest.fn().mockResolvedValue('1000000');
        const balance = yield app.getBalanceOf('someAddress');
        expect(typeof balance).toBe('string');
    }));
    // Testing getLastBlockNum function
    test('getLastBlockNum returns a number', () => __awaiter(void 0, void 0, void 0, function* () {
        // Make the getBlockNumber function to return a fixed value 123456
        app.provider.getBlockNumber = jest.fn().mockResolvedValue(123456);
        const blockNum = yield app.getLastBlockNum();
        expect(typeof blockNum).toBe('number');
    }));
});
//# sourceMappingURL=etherApp.test.js.map