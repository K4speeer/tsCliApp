import { ethers } from 'ethers';
import { EtherApp } from '../src/etherApp';

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
  let etherApp: EtherApp;
  const apiKey = 'testApiKey';

  beforeEach(() => {
    // Initialize EtherApp before each test
    etherApp = new EtherApp(apiKey);
  });

  describe('getBalanceOf', () => {
    it('should return the balance of a given address', async () => {
      const address = '0xdac17f958d2ee523a2206206994597c13d831ec7';
      const balance = await etherApp.getBalanceOf(address);
      expect(balance).toBe('1.0'); // Expecting 1 USDT as mocked
      expect(ethers.Contract.prototype.balanceOf).toHaveBeenCalledWith(address);
    });
  });

  describe('getLastBlockNum', () => {
    it('should return the last mined block number', async () => {
      const blockNumber = await etherApp.getLastBlockNum();
      expect(blockNumber).toBe(123456); // Expecting mocked block number
      expect(ethers.EtherscanProvider.prototype.getBlockNumber).toHaveBeenCalled();
    });
  });
});
