# pundix_assignment

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
