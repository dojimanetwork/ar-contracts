
import fs from "fs"
import { execute } from "smartweave/lib/contract-step"
import { readContract, loadContract, interactFakeWrite } from "../src/swglobal";
import Client from './utils/init'

//read contract from json
const contract = JSON.parse(fs.readFileSync("./fake_contract.json") as unknown as string);

const target = process.env.TARGET_ADDRESS


const wallet = JSON.parse(fs.readFileSync("./wallet.json") as unknown as string);

(async () => {
try{
  const contractId = contract.id
  //load contract
  const load = await loadContract(Client, contractId)

  const {handler, initState} = load
  
  const from = await Client.wallets.getAddress(wallet) //address
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
  const write = await interactFakeWrite(Client, wallet, contractId, input, [
    {
      name: "Dojima-Transfer-Address",
      value: "kkynJfegxPERA1_DBmaw7AYIsjnplTfX4tNpIF_Vy3w"
    }
  ])

  await Client.api.get('mine')
  // console.log("Db transaction write", write);

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


