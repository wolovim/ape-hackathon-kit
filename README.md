# ape-hackathon-kit

Example project utilizing Ape for Solidity contract management and a Next.js
application to display and interact with the contract on the front-end.

## Setup

### 1. Compile and test the contract

- Set up a fresh python virtual environment, then clone this repo
- `pip install eth-ape ipython pdbpp`
- `ape plugins install .`
- `ape compile`
- `ape test`

### 2. Deploy the contract to a local test environment

- Install Foundry
- Start Anvil in one terminal pane (`$ anvil`)
- Run the deploy script in another: `ape run deploy_local --network foundry`

### 3. Interact with the contract in the web app

- `cd webapp`
- `npm install`
- `npm run dev`
- visit localhost:3000, connect a wallet, view and update the Billboard message

Note: when you start Anvil, ten test accounts and their private keys will be
printed in the console. You can import any of those private keys into a wallet,
e.g., MetaMask, and then interact with the contract using that test ether.

## Resources

- [Intro to Ape](https://snakecharmers.ethereum.org/intro-to-ape/)
- [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/4.x/wizard)
- [Next.js](https://nextjs.org/learn)
