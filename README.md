# pundix_assignment

# solidity coding

This project is the bonus assignment task for the pundix developer test

## Setup

1. Install packages
```
yarn install
```
2. Copy .env.sample as .env and add your controlKey

```bash
cp .env.sample .env
```

3. Compile contracts

```bash
yarn hardhat compile
```

To deploy contracts onto goerli network
```shell
yarn hardhat run --network goerli scripts/deploy.ts
```

# querying of validators and their commissions

I attempted this bonus task as well to get the cumulative earnings of each of the validators
This is the endpoint I tried to use
```
https://fx-rest.functionx.io/cosmos/distribution/v1beta1/validators/{address}/commission
```
It expects a address prefixed with fxvaloper. 
The validator addresses I received are from these two endpoints
```
https://fx-json.functionx.io/validators
https://fx-rest.functionx.io/cosmos/base/tendermint/v1beta1/validatorsets/latest
```
The first endpoint gives addresses in hex while the second one is prefixed with fxvalcon.
I tried to use @cosmjs/encoding to encode it to prefix with fxvaloper but the addresses were still not correct.
I also tried to use @cosmjs/amino to get the bech32 addresses from pubkey but the signing type does not seem to be supported.