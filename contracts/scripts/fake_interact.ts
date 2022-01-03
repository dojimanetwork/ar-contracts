import Arweave from "arweave"
// import { loadContract, interactWrite, readContract } from "smartweave"
import fs from "fs"
import { execute } from "smartweave/lib/contract-step"
import { readContract, interactWrite, loadContract, interactWriteDryRun, simulateInteractWrite, interactFakeWrite } from "../src/swglobal";
import dotenv from 'dotenv'


dotenv.config()

const client = new Arweave({
    host: "localhost",
    port: 1984,
    protocol: "http",
});

//read contract from json
const contract = JSON.parse(fs.readFileSync("./fake_contract.json") as unknown as string);

const target = process.env.TARGET_ADDRESS


const wallet = JSON.parse(fs.readFileSync("./wallet.json") as unknown as string);

(async () => {
try{
  const contractId = contract.id
  //load contract
  const load = await loadContract(client, contractId)
  // const latestState = await readContract(client, "EvDJsAQ1Ns7WOQMJwuryJehRAId2DW4oHmVc3q6pqRU")
  const {handler, initState} = load
  
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
  const write = await interactFakeWrite(client, wallet, contractId, input, [
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
  

  //validation
  //owner of the transation should exists in contract state
  if (read.state.balances && read.state.balances[target]) {
    console.log("owner exists in contract state");
  } else {
    console.log("target owner doesn't exists in contract state", target); 
  }

  
}
catch(e){
    console.log(e);
}
})();


