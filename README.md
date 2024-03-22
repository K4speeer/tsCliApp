# ETHELI - TypeScript Comman-Line Application **v0.8.0**

Designed to interact with the Ethereum blockchain. It allows users to perform various operations such as getting USDT balance of an account using it's address and checking the last block mined in the Etherium Mainnet.


# Installation
Install the packege using NPM - Node Package Manager

``` $ npm install etheli -g```


# Dependencies: 
    nodejs >= 18.0.0


# Application Commands:

- ## get-balance [address]  

    This function returns the USDT Balance of a given address in a readable format.
    
    **Note:** The address should be given like : "0xdac17f958d2ee523a2206206994597c13d831ec7"
    
    **example:** 
    
    ```etheli get-balance 0xdac17f958d2ee523a2206206994597c13d831ec7 ```

    **Output**
    ```Balance: 714056.512482 USDT```

- ## get-last-block 

    Returns the number of the last block mined in the Etherium mainnet.
    
    **example:**
    
    ```etheli get-last-block```

    **Output**
    ```Last Block Mined Using Etherscan Provider: 19332460```


