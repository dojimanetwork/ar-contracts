import Arweave from "arweave"
// import { loadContract, interactWrite, readContract, interactWriteDryRun } from "smartweave"
import fs from "fs"
import { execute } from "smartweave/lib/contract-step"
import { readContract, interactWrite, loadContract, interactWriteDryRun, simulateInteractWrite } from "../src/swglobal";
import dotenv from 'dotenv'

dotenv.config()

const client = new Arweave({
    host: "localhost",
    port: 1984,
    protocol: "http",
});

//read contract from json
const contract = JSON.parse(fs.readFileSync("./contract.json") as unknown as string);

const target = process.env.TARGET_ADDRESS


const wallet = JSON.parse(fs.readFileSync("./wallet.json") as unknown as string);

(async () => {
try{
  const contractId = contract.id
  //load contract
  const load = await loadContract(client, contractId)
  // const latestState = await readContract(client, "EvDJsAQ1Ns7WOQMJwuryJehRAId2DW4oHmVc3q6pqRU")
  const {handler, initState, contractSrc, swGlobal, id} = load
  
  const from = await client.wallets.getAddress(wallet) //address
  const input = {
    function: 'transfer',
    target,
    qty: 1000
  }
  const interaction = {
    input: input,
    caller: from
  };

  // //testing the result
  const response = await execute(handler, interaction, JSON.parse(initState))
  console.log("Response result -----",response.result, response.state, response.type);

  // // //write transaction to db
  const write = await interactWrite(client, wallet, contractId, input, [
    {
      name: "Dojima-Transfer-Address",
      value: "kkynJfegxPERA1_DBmaw7AYIsjnplTfX4tNpIF_Vy3w"
    }
  ])

  await client.api.get('mine')
  // console.log("Db transaction write", write);

  // read transaction from db
  const read = await readContract(client, contractId, undefined, true)
  console.log("Latest state from db", read);
}
catch(e){
    console.log(e);
}
})();
