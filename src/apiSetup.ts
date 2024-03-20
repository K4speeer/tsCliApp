import * as readline from 'readline';
import { promises as fs } from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
config()


// Load environment variables from .env file
config({ path: path.resolve(__dirname, '.env') });

// Function to check the existence of the API key
export const checkApiKeyExists = (): boolean => {
    const apiKey = process.env.ETHERSCAN_API_TOKEN;
    return apiKey !== undefined && apiKey !== '';
};

// Function to prompt for the API key
export const promptApiKey = async (): Promise<string> => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    return new Promise((resolve) => {
      rl.question('Please enter your API key: ', (apiKey) => {
        rl.close();
        resolve(apiKey);
      });
    });
  };
  
// Function to save the API key to the .env file
export const saveApiKeyToEnv = async (apiKey: string): Promise<void> => {
    const envFilePath = path.join(__dirname, '.env');
    const envContent = `ETHERSCAN_API_TOKEN=${apiKey}\n`;
    await fs.writeFile(envFilePath, envContent, { encoding: 'utf-8', flag: 'w' });
    console.log('API key saved successfully.');
  };
  