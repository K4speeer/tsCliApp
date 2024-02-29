import { EtherApp } from "../src/etherApp";

describe('EthersApp', () => {
  let app: EtherApp;

  beforeAll(() => {
    // Adding dummy API key for testing
    app = new EtherApp('dummyApiKey');
  });
  // Testing getBalanceOf function 
  test('getBalanceOf returns a string', async () => {
    // Make the balanceOf function to return a fixed value str(1000000)
    app.usdtContract.balanceOf = jest.fn().mockResolvedValue('1000000') as any;
    const balance = await app.getBalanceOf('someAddress');
    expect(typeof balance).toBe('string');
  });

  // Testing getLastBlockNum function
  test('getLastBlockNum returns a number', async () => {
    // Make the getBlockNumber function to return a fixed value 123456
    app.provider.getBlockNumber = jest.fn().mockResolvedValue(123456);
    const blockNum = await app.getLastBlockNum();
    expect(typeof blockNum).toBe('number');
  });
});