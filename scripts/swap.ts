import fs from "fs";
import Client from "./utils/init";
import {Tag} from "arweave/node/lib/transaction";

(async () => {
    const to_addr = process.env.TARGET_ADDRESS
    const amt = process.env.TRANSFER_AMT as string
    const memo = process.env.MEMO as string
    const wallet = JSON.parse(fs.readFileSync("./wallet-2.json") as unknown as string);
    const from = await Client.wallets.getAddress(wallet)
    console.log("from address", from);
    // const tag = new Tag(
    //     "memo",
    //     "SWAP:D11K.DOJ:dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62"
    // )
    console.log(memo)
    const tag = new Tag(
        "memo",
        memo
    )
    const transfer = await Client.createTransaction({
        target: to_addr,
        tags: [tag],
        quantity: Client.ar.arToWinston(amt)
    }, wallet)

    await Client.transactions.sign(transfer, wallet)
    const status = await Client.transactions.post(transfer)
    await Client.api.get("/mine")
    console.log("transfer status", status)
})()