import Arweave from "arweave"
import { readContract } from "smartweave"
import fs from "fs"
// import { readContract, interactWrite, loadContract, interactWriteDryRun, simulateInteractWrite } from "../src/swglobal";
import dotenv from 'dotenv'

dotenv.config()

const client = new Arweave({
    host: "localhost",
    port: 1984,
    protocol: "http",
});

//read contract from json
const contract = JSON.parse(fs.readFileSync("./fake_contract.json") as unknown as string);

const target:string = process.env.TARGET_ADDRESS as string


(async () => {
try{
  const contractId = contract.id
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
