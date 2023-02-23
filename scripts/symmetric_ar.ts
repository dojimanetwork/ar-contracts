import Client from './utils/init'
import fs from 'fs'
import {Tag} from "arweave/node/lib/transaction";


const to_addr = process.env.TARGET_ADDRESS
const lp_memo = process.env.LP_MEMO as string
const lp_amt = process.env.LP_AMT as string

const wallet = JSON.parse(fs.readFileSync("./wallet-2.json") as unknown as string);

(async () => {

    const from = await Client.wallets.getAddress(wallet)

    const tag = new Tag(
        Client.utils.stringToB64Url("memo"),
        Client.utils.stringToB64Url(lp_memo)
)
    const transfer = await Client.createTransaction({
        target: to_addr,
        tags: [tag],
        quantity: Client.ar.arToWinston(lp_amt)
    }, wallet)

    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
    
})()
