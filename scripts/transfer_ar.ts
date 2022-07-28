import Client from './utils/init'
import fs from 'fs'
import {Tag} from "arweave/node/lib/transaction";


const to_addr = process.env.TARGET_ADDRESS
const wallet = JSON.parse(fs.readFileSync("./wallet-2.json") as unknown as string);

(async () => {

    const from = await Client.wallets.getAddress(wallet)
    console.log("from address", from);
    const tag = new Tag(
        "memo",
        "ADD:AR.AR:dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62"
)
    const transfer = await Client.createTransaction({
        target: to_addr,
        tags: [tag],
        quantity: Client.ar.arToWinston("10000000")
    }, wallet)

    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
    
})()
