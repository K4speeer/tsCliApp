# TypeScript Comman-Line Application

Designed to interact with the Ethereum blockchain. It allows users to perform various operations such as getting USDT balance of an account using it's address and checking the last block mined in the Etherium Mainnet.


# Installation
``` $ git clone https://github.com/K4speeer/tsCliApp```

Open the repository in any editor, and replace the placeholder in the **.env** file with your own Etherscan API Token.

Build the package using 

``` $ npm run build ```

install the package globally to use it from the terminal (command-line):

``` $ nppm install -g```



## Dependencies

- ethers.js
- commander.js
- dotenv

# Usage

The application is *literally* **simple**. It have only two functions *so far*:

- ## get-balance [address] Function 

    This function returns the USDT Balance of a given address in a readable format.
    
    **Note:** The address should be given like : "0xdac17f958d2ee523a2206206994597c13d831ec7"
    
    **example:** 
    
    ```tsliapp get-balance 0xdac17f958d2ee523a2206206994597c13d831ec7 ```

    **Output**
    ```Balance: 714056.512482 USDT```

- ## get-last-block function

    Returns the number of the last block mined in the Etherium mainnet.
    
    **example:**
    
    ```tsliapp get-last-block```

    **Output**
    ```Last Block Mined Using Etherscan Provider: 19332460```


