import { LoggerFactory, SmartWeaveNodeFactory } from "redstone-smartweave";
import { TsLogFactory } from "redstone-smartweave/lib/cjs/logging/node/TsLogFactory";
import Client from "../utils/init";
import path from 'path'

async function ReadContract() {
    // LoggerFactory.use(new TsLogFactory())
    LoggerFactory.INST.logLevel("debug", "Read contract interactions")

    const contractTxId = "-8A6RexFkpfWwuyVO98wzSFZh0d6VJuI-buTJvlwOJQ"
    const smartweave = SmartWeaveNodeFactory.memCached(Client)

    const contract = smartweave.contract(contractTxId)
    const { state, validity } = await contract.readState()
    
    console.log(state);
    console.log(validity);
    

}

ReadContract().catch((e) => console.log(e))