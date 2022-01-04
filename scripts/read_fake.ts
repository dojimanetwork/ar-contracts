import Client from './utils/init'
import { readContract } from "smartweave"
import fs from "fs"
// import { readContract, interactWrite, loadContract, interactWriteDryRun, simulateInteractWrite } from "../src/swglobal";



//read contract from json
const contract = JSON.parse(fs.readFileSync("./fake_contract.json") as unknown as string);

const target:string = process.env.TARGET_ADDRESS as string


(async () => {
try{
  const contractId = contract.id
  // read transaction from db
  const read = await readContract(Client, contractId, undefined, true)
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
