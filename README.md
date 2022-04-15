# random-words-nft

A free NFT drop I created as part of [@_buildspace](https://twitter.com/_buildspace)'s Ethereum NFT project.
The contract for this project can be found in [solidity-contracts](https://github.com/evantancy/solidity-contracts) as `src/RandomWordsNFT.sol` and the corresponding test

I have extended the my application & smart contracts to allow additional features below (while they may not be 100% gas optimized):

Additional features:

- Front-end
  - MetaMask prompt to switch to Rinkeby network
  - Buttons to adjust quantity for batch minting
  - Toast message linking transaction
- Solidity:
  - Batch minting
  - Gas optimzation in storing tokens on-chain
