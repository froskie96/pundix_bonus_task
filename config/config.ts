import fs from 'fs'

const configPath = './contractConfig.json'

export interface Config {
  Name?: string,
  Deployer?: string,
  LanceToken721?: string,
  LanceToken20?: string,
}

export const readConfig = async (networkName: string) => {
  let jsonData
  try {
    jsonData = fs.readFileSync(configPath)
  } catch (err: any) {
    if (err.code == 'ENOENT') {
      createEmptyConfig()
      return
    } else {
      console.error(err)
      process.exit(1)
    }
  }
  if (jsonData === undefined) {
    return
  }
  const json = JSON.parse(jsonData.toString())
  if (json.Networks === undefined) {
    return
  }
  for (let i = 0; i < json.Networks.length; i++) {
    if (json.Networks[i].Name == networkName) {
      return json.Networks[i]
    }
  }
}

export const writeConfig = async (networkConfig: Config) => {
  if (networkConfig.Name === undefined) {
    console.error('invalid network config'.red)
    process.exit(1)
  }
  const data = fs.readFileSync(configPath)
  const json = JSON.parse(data.toString())
  let writeIndex = json.Networks.length
  for (let i = 0; i < json.Networks.length; i++) {
    if (json.Networks[i].Name == networkConfig.Name) {
      writeIndex = i
      break
    }
  }
  json.Networks[writeIndex] = networkConfig
  const jsonConfig = JSON.stringify(json, null, '\t')
  try {
    fs.writeFileSync(configPath, jsonConfig)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

export const createEmptyConfig = () => {
  const json = { Networks: [] }
  const jsonConfig = JSON.stringify(json, null, '\t')
  try {
    fs.writeFileSync(configPath, jsonConfig)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}