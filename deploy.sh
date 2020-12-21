#!/usr/bin/env bash

# Deploy contracts
truffle migrate --reset --network rinkeby

# Verify Contracts on Etherscan
truffle run verify ArtNFT --network rinkeby --license SPDX-License-Identifier
truffle run verify GameNFT --network rinkeby --license SPDX-License-Identifier
truffle run verify JupiterToken --network rinkeby --license SPDX-License-Identifier
truffle run verify MarsToken --network rinkeby --license SPDX-License-Identifier

# Flatten Contracts
./node_modules/.bin/truffle-flattener contracts/ArtNFT.sol > flats/ArtNFT_flat.sol
./node_modules/.bin/truffle-flattener contracts/GameNFT.sol > flats/GameNFT.sol
./node_modules/.bin/truffle-flattener contracts/JupiterToken.sol > flats/JupiterToken.sol
./node_modules/.bin/truffle-flattener contracts/MarsToken.sol > flats/MarsToken.sol
