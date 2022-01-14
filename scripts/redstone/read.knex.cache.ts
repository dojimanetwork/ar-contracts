import knex from "knex";
import { LoggerFactory, SmartWeaveNodeFactory } from "redstone-smartweave";
import Client from "../utils/init";
import fs from 'fs'
import path from 'path'


const wallet = JSON.parse(fs.readFileSync("./wallet.json") as unknown as string);
const cacheDir = path.join(__dirname, 'db');
const knexConfig = knex({
    client: 'sqlite3',
    connection: {
      filename: `${cacheDir}/db.sqlite`
    },
    useNullAsDefault: true
})
async function KnexCached() {
    const smartweave = await SmartWeaveNodeFactory.knexCached(Client, knexConfig)
    LoggerFactory.INST.logLevel("debug", "Read contract interactions")

    const contractTxId = "-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ"
    const contract = smartweave.contract(contractTxId).connect(wallet)
    const { state, validity } = await contract.readState()
    
    console.log(state);
    console.log(validity);
}

KnexCached().catch(e => console.log(e))
