# ape-hackathon-kit

Example project utilizing Ape for Solidity contract management and a Next.js
application to display and interact with the contract on the front-end.

<img width="422" alt="Screenshot 2023-08-17 at 3 39 07 PM" src="https://github.com/wolovim/ape-hackathon-kit/assets/3621728/3e2520a5-b2df-4d69-895d-2eef53303dcc">

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
- Run the deploy script in another: `ape run deploy_local`

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
- [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)
- [Next.js](https://nextjs.org/learn)

_Hat tip to repo co-conspirators [fselmo](https://github.com/fselmo), [pacrob](https://github.com/pacrob), and [reedsa](https://twitter.com/stuartareed)._
