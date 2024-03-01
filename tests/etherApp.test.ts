import { EtherApp } from '../src/etherApp';
import { ethers } from 'ethers';

jest.mock('ethers');

describe('EtherApp', () => {
  let etherApp: EtherApp;
  const mockProvider = { getBlockNumber: jest.fn(), balanceOf: jest.fn() };
  const mockContract = { balanceOf: jest.fn() };
  const apiKey = 'testApiKey';

  beforeEach(() => {
    ethers.EtherscanProvider = jest.fn().mockImplementation(() => mockProvider);
    ethers.Contract = jest.fn().mockImplementation(() => mockContract);
    ethers.getDefaultProvider = jest.fn().mockReturnValue(mockProvider);
    ethers.formatUnits = jest.fn().mockReturnValue('formattedBalance');
    etherApp = new EtherApp(apiKey);
  });

  describe('getBalanceOf', () => {
    it('should return the formatted balance of a given address', async () => {
      const testAddress = '0x123';
      mockContract.balanceOf.mockResolvedValue('1000000');

      const balance = await etherApp.getBalanceOf(testAddress);

      expect(mockContract.balanceOf).toHaveBeenCalledWith(testAddress);
      expect(ethers.formatUnits).toHaveBeenCalledWith('1000000', 6);
      expect(balance).toBe('formattedBalance');
    });
  });

  describe('getLastBlockNum', () => {
    it('should return the last mined block number', async () => {
      mockProvider.getBlockNumber.mockResolvedValue(123456);

      const blockNum = await etherApp.getLastBlockNum();

      expect(ethers.getDefaultProvider).toHaveBeenCalled();
      expect(mockProvider.getBlockNumber).toHaveBeenCalled();
      expect(blockNum).toBe(123456);
    });
  });
});

