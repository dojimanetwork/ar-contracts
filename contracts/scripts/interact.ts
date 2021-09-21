import Arweave from "arweave"
// import { loadContract, interactWrite } from "smartweave"
import fs from "fs"
import { execute } from "smartweave/lib/contract-step"
import { readContract, interactWrite, loadContract } from "../src/swglobal";

const client = new Arweave({
    host: "localhost",
    port: 1984,
    protocol: "http",
});
// const contractSrc = "X3KIN_iRRQfZddaHllZ70GoA_pWZZ-Q5tvZjG1NGJKE"
const contractId = "aDYhw5u53H-UHODkB2tzB7YEKOFlw6TTDvEH7m8UG-w"
const target = "kkynJfegxPERA1_DBmaw7AYIsjnplTfX4tNpIF_Vy3w"
const wallet = JSON.parse(fs.readFileSync("./arweave.json") as unknown as string);

(async () => {
try{

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
  const write = await interactWrite(client, wallet, contractId, input)
  console.log("Db transaction write", write);

  //read transaction from db
  const read = await readContract(client, contractId, 0, true)
  console.log("Latest state from db", read);
}
catch(e){
    console.log(e);
}
})();
