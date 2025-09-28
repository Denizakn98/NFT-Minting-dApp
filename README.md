
# NFT Minting dApp

A simple decentralized application for minting NFTs (ERC-721) with image upload to IPFS.  
Includes:
- Solidity smart contract for minting NFTs
- React frontend for interacting with the contract and uploading files

## Requirements

- Node.js & npm
- Hardhat (for local blockchain/testing)
- MetaMask browser extension
- Infura or Alchemy API key for IPFS (or use Pinata)

## Setup

1. Clone this repo.
2. Install dependencies for both contract and frontend:

   ```
   cd smart-contract
   npm install

   cd ../frontend
   npm install
   ```

3. Deploy the smart contract using Hardhat or Remix.
4. Copy the deployed contract address and ABI into `frontend/src/config.js`.
5. Start the frontend:

   ```
   cd frontend
   npm start
   ```

## Notes

- Use MetaMask to connect and mint NFTs.
- Uploaded images are pinned to IPFS.
- For testing, use a local Hardhat network or testnet (Goerli, Sepolia, etc.).
