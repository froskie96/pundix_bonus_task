import { fromBech32, toBech32 } from '@cosmjs/encoding'

const RPC_URL = 'https://fx-rest.functionx.io/cosmos/base/tendermint/v1beta1/validatorsets/latest'

export const getBridgeData = async () => {
  const res = await fetch(RPC_URL)
  const data = await res.json()
  const validators = data.validators

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i]
    const aaa = validator.address

    const abc = toBech32('fxvaloper', fromBech32(aaa).data)
    console.log(abc)
  }
}

(async () => {
  await getBridgeData()
})().catch(console.error).finally(() => process.exit(0))

