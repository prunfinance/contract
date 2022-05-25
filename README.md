# PRUN

Development for PRUN Contract Tokenomics

#### Setup

Make sure these tools are installed with the correct version

- `nodejs` LST `v16.14.2`
- `npm` `8.5.0`
- `solc` `0.8.1` and `0.7.4`

#### Build and Deploy
Install dependencies
```console
cmd$> npm install
```

Compile contracts
```console
cmd$> npx hardhat compile
```

Deploy contracts (default is testnet network `hardhat`)
```console
cmd$> npx hardhat run scripts/deploy.js --network <your-network>
```

Verify contracts (default is testnet network `hardhat`)
```console
cmd$> npx hardhat run scripts/verify.js --network <your-network>
```

