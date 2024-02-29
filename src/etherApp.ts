import {ethers} from 'ethers'

export class EtherApp{
    // Both Default provider and Etherscan provider connects to same node
    provider: ethers.EtherscanProvider;
    usdtContract: ethers.Contract;
    
    // Creating constructor  
    constructor(apiKey:string){
        // Creating Contract instance with desired functionality (USDT balance getter)
        this.provider = new ethers.EtherscanProvider("homestead", apiKey);
        const usdtContractAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
        
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
        this.usdtContract = new ethers.Contract(usdtContractAddress, usdtAbi, this.provider);
    }

    // USDT Balance function
    async  getBalanceOf(address:string) {
    const balance = await this.usdtContract.balanceOf(address)
    // Convert from wei to usdt
    const balanceInUsdt = ethers.formatUnits(balance, 6);
    console.log(`Balance: ${balanceInUsdt} USDT`)
    }

    // Last mined block number function
    async getLastBlockNum(){
    // const defBlockNum = await defaultProvider.getBlockNumber();
    const blocknum = await this.provider.getBlockNumber();
    // console.log(`BlockNum Using Default Provider : ${defBlockNum}`)
    console.log(`Last Block Mined Using Etherscan Provider : ${blocknum}`)
}

}

// getBalanceOf("0xdac17f958d2ee523a2206206994597c13d831ec7")
// getLastBlockNum();